export const API_CONFIG = {
    GITHUB_API_URL: 'https://api.github.com',
    CACHE_DURATION: 5 * 60 * 1000,
    DEFAULT_LIMIT: 6,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1,
} as const;

export const ANIMATION_CONFIG = {
    DURATION: 0.6,
    DELAY: 100,
    EASE: 'power3.out',
    THRESHOLD: 0.1,
    ROOT_MARGIN: '-100px',
} as const;

export const SPLIT_TEXT_CONFIG = {
    DURATION: 0.6,
    DELAY: 100,
    EASE: 'power3.out',
    SPLIT_TYPE: 'chars' as const,
    FROM: { opacity: 0, y: 40 },
    TO: { opacity: 1, y: 0 },
    THRESHOLD: 0.1,
    ROOT_MARGIN: '-100px',
    TEXT_ALIGN: 'center' as const,
} as const;

export const BLUR_TEXT_CONFIG = {
    DELAY: 150,
    ANIMATE_BY: 'words' as const,
    DIRECTION: 'top' as const,
} as const;

export const GOOEY_NAV_CONFIG = {
    PARTICLE_COUNT: 15,
    PARTICLE_DISTANCES: [90, 10] as [number, number],
    PARTICLE_R: 100,
    INITIAL_ACTIVE_INDEX: 0,
    ANIMATION_TIME: 600,
    TIME_VARIANCE: 300,
    COLORS: [1, 2, 3, 1, 2, 3, 1, 4],
};

export const PARTICLES_CONFIG = {
    COLORS: ['#ffffff', '#ffffff'],
    COUNT: 200,
    SPREAD: 10,
    SPEED: 0.1,
    BASE_SIZE: 100,
    MOVE_ON_HOVER: false,
    ALPHA_PARTICLES: false,
    DISABLE_ROTATION: false,
};

export const MAGIC_BENTO_CONFIG = {
    TEXT_AUTO_HIDE: true,
    ENABLE_STARS: true,
    ENABLE_SPOTLIGHT: true,
    ENABLE_BORDER_GLOW: true,
    ENABLE_TILT: true,
    ENABLE_MAGNETISM: true,
    CLICK_EFFECT: true,
    SPOTLIGHT_RADIUS: 300,
    PARTICLE_COUNT: 12,
    GLOW_COLOR: '41, 246, 255',
} as const;

export const ELECTRIC_BORDER_CONFIG = {
    COLOR: '#FFFFFF',
    SPEED: 1,
    CHAOS: 0.5,
    THICKNESS: 2,
    BORDER_RADIUS: 16,
} as const;

export const SPOTLIGHT_CARD_CONFIG = {
    SPOTLIGHT_COLOR: 'rgba(98, 238, 252, 0.22)',
} as const;

export const SOCIAL_LINKS = {
    GITHUB: 'https://github.com/kiuzo',
    LINKEDIN: 'https://www.linkedin.com/in/david-soares-lopes/',
} as const;

export const PERSONAL_INFO = {
    USERNAME: 'Kiuzo',
    FULL_NAME: 'David Soares Lopes',
    ROLE: 'Desenvolvedor Front-end',
    RESUME_PATH: '/davidSoaresCurriculo.pdf',
} as const;

export const SPACING = {
    SECTION_PADDING: 'px-4 sm:px-6 lg:px-8',
    SECTION_TITLE_MB: 'mb-12',
    SECTION_CONTENT_MT: 'mt-12',
    CARD_PADDING: 'p-6 sm:p-8',
    CARD_GAP: 'gap-6 lg:gap-8',
    BUTTON_MT: 'mt-8',
    CONTAINER_MAX_WIDTH: 'max-w-7xl w-full',
} as const;

export const TYPOGRAPHY = {
    SECTION_TITLE: 'text-5xl sm:text-6xl',
    SUBTITLE: 'text-3xl sm:text-4xl',
    CARD_TITLE: 'text-xl sm:text-2xl',
    PARAGRAPH: 'text-lg sm:text-xl',
} as const;
