"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addData, getAllDocs, getDate, queryData, time } from "@repo/firebase";
import { useStore } from "@repo/store";
import toast from "react-hot-toast";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Task {
  uid: string;
  desc: string;
  points: string;
  deadline: time;
  award: string | undefined;
  link: string | undefined;
}

export function TasksTab() {
  const { user } = useStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [link, setLink] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllTasks = async () => {
    try {
      const allTasks = await getAllDocs("tasksCA26");
      const submissions = await queryData("CAsSubmissions26", "id", user?.details?.id);

      if (submissions != null && allTasks != null) {
        const fetchedTasks: Task[] = [];
        allTasks.forEach((task: any) => {
          let newTask: Task;
          const submission = submissions.find((sub: any) => sub.data.taskId === task.uid);

          if (submission !== undefined) {
            newTask = {
              uid: task.uid,
              desc: task.data.desc,
              points: task.data.points,
              deadline: task.data.deadline,
              award: submission.data.award,
              link: submission.data.link,
            };
          } else {
            newTask = {
              uid: task.uid,
              desc: task.data.desc,
              points: task.data.points,
              deadline: task.data.deadline,
              award: undefined,
              link: undefined,
            };
          }
          fetchedTasks.push(newTask);
        });
        setTasks(fetchedTasks);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.details?.id) {
      getAllTasks();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const submit = async (task: Task) => {
    try {
      if (link !== "") {
        // [SECURITY] Validate the link is a proper https:// URL to prevent XSS via javascript: URIs
        if (!/^https:\/\/.+/.test(link.trim())) {
          toast.error("Please provide a valid https:// link as proof.");
          return;
        }
        // [SECURITY] Enforce max length to prevent storage abuse
        if (link.trim().length > 500) {
          toast.error("Link is too long. Please use a shortened URL.");
          return;
        }
        const data = {
          taskId: task.uid,
          taskDesc: task.desc,
          taskPoints: task.points,
          uid: user?.user.uid,
          id: user?.details.id,
          name: user?.details.name,
          email: user?.details.email,
          phone: user?.details.phone,
          link: link.trim(),
          college: user?.details.college,
          collegeCity: user?.details.collegeCity,
        };
        await addData("CAsSubmissions26", data);
        toast.success("Submission Accepted!");
        setLink("");
        getAllTasks();
        setIsOpen(false);
        setCurrentTask(null);
      } else {
        toast.error("Provide Link");
      }
    } catch (error) {
      // [SECURITY] Do not expose raw error to user
      console.error("Task submission error:", error);
      toast.error("Submission failed. Please try again.");
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 relative min-h-[400px]">
      
      {/* Modal Overlay */}
      {isOpen && currentTask && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl p-4">
          <div className="bg-[#111] border border-white/10 rounded-lg p-4 sm:p-6 w-full max-w-md shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-white/40 hover:text-white"
              onClick={() => {
                setIsOpen(false);
                setCurrentTask(null);
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-sans font-bold text-white mb-4">Submit Proof</h3>
            <p className="text-sm text-white/60 mb-4 line-clamp-2">{currentTask.desc}</p>
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="link" className="text-xs font-sans font-semibold tracking-wider text-white/40 uppercase">
                Link of Proof *
              </label>
              <input
                id="link"
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <button
              onClick={() => submit(currentTask)}
              className="w-full py-2.5 bg-accent hover:bg-red-600 text-[12px] font-sans font-bold uppercase tracking-wider text-white rounded-md transition-colors duration-200"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading Tasks...</div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">No tasks available.</div>
        </div>
      ) : (
      <div className="flex flex-col w-full">
        {/* ── Missions progress summary ─────────────────────────────── */}
        {(() => {
          const done = tasks.filter((t) => t.link !== undefined).length;
          const pct = tasks.length ? (done / tasks.length) * 100 : 0;
          return (
            <div className="mb-8 px-1">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold md:text-[11px]">
                  Your Missions
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {done} / {tasks.length} complete
                </span>
              </div>
              <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-ember to-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                />
              </div>
            </div>
          );
        })()}

        {/* ── Mission cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {tasks.map((task, i) => {
            const submitted = task.link !== undefined;
            const awarded = submitted && task.award !== undefined;
            return (
              <motion.div
                key={task.uid}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.07 }}
                className={`group relative flex flex-col overflow-hidden rounded-xl border p-5 transition-all duration-300 md:p-6 ${
                  awarded
                    ? "border-gold/40 bg-gold/[0.05]"
                    : submitted
                      ? "border-white/15 bg-white/[0.03]"
                      : "border-white/10 bg-white/[0.02] hover:border-gold/35 hover:bg-white/[0.035] hover:shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_22px_rgba(212,162,78,0.08)]"
                }`}
              >
                {/* Mission header */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    Mission {String(i + 1).padStart(2, "0")}
                  </span>
                  {awarded ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 + i * 0.07 }}
                      className="flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      +{task.award} PTS
                    </motion.span>
                  ) : submitted ? (
                    <span className="rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
                      In Review
                    </span>
                  ) : (
                    <span className="rounded-full border border-gold/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
                      {task.points} PTS
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mb-5 flex-1 text-[14px] font-medium leading-relaxed text-foreground md:text-[15px]">
                  {task.desc}
                </p>

                {/* Footer: deadline + action */}
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center text-[12px] text-white/50">
                    <svg className="mr-2 h-4 w-4 shrink-0 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {task.deadline ? getDate(task.deadline).toString() : "No Deadline"}
                  </span>

                  {!submitted && (
                    <button
                      onClick={() => {
                        setCurrentTask(task);
                        setIsOpen(true);
                      }}
                      className="shrink-0 rounded-md bg-accent px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/10 transition-all duration-200 hover:bg-red-600 hover:shadow-accent/25 active:scale-95"
                    >
                      SUBMIT
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
