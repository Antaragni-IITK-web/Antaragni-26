export const assets = {
  logos: {
    main: "/logos/antaragni-logo.svg",
    mark: "/logos/antaragni-mark.svg",
    iitk: "/logos/iitk-logo.svg",
  },

  hero: {
    stage: "/hero/hero-stage.webp",
    smoke: "/hero/hero-smoke-overlay.webp",
  },

  spirit: {
    crowd: "/spirit/spirit-crowd.webp",
    background: "/spirit/spirit-background.webp",
  },

  testimonials: {
    main: "/testimonials/ca-testimonial.webp",
  },

  incentives: {
    certificate: "/incentives/certificate.webp",
    medal: "/incentives/medal.webp",
    bottle: "/incentives/bottle.webp",
    cap: "/incentives/cap.webp",
    giftBox: "/incentives/gift-box.webp",
  },

  contact: {
    ambassador1: "/contact/ambassador-1.webp",
    ambassador2: "/contact/ambassador-2.webp",
    ambassador3: "/contact/ambassador-3.webp",
    ambassador4: "/contact/ambassador-4.webp",
    ambassador5: "/contact/ambassador-5.webp",
  },

  sponsors: {
    samsung: "/sponsors/samsung.svg",
    cocaCola: "/sponsors/coca-cola.svg",
    hyundai: "/sponsors/hyundai.svg",
    hdfc: "/sponsors/hdfc.svg",
  },
} as const;

export type AssetRegistry = typeof assets;
