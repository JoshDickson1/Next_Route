import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import { createInstance } from "i18next";
import * as React from "react";
import { Suspense, createContext, useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookMarked, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Clock, Compass, CreditCard, FileText, Heart, Luggage, Mail, Map, MapPin, MessageCircle, Minus, Navigation, Phone, Plane, Plus, Search, Send, Shield, Star, Users, X, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import createGlobe from "cobe";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
//#region src/providers/ThemeProvider.tsx
var ThemeContext = createContext(null);
function ThemeProvider({ children }) {
	const theme = "light";
	const resolvedTheme = "light";
	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add("light");
	}, []);
	const setTheme = (_t) => {};
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value: {
			theme,
			resolvedTheme,
			setTheme
		},
		children
	});
}
//#endregion
//#region src/components/common/LanguageSwitcher.tsx
var LANGUAGES = [
	{
		code: "en",
		label: "EN",
		flag: "🇳🇬",
		name: "English"
	},
	{
		code: "ar",
		label: "AR",
		flag: "🇦🇪",
		name: "العربية"
	},
	{
		code: "sw",
		label: "SW",
		flag: "🇹🇿",
		name: "Kiswahili"
	},
	{
		code: "it",
		label: "IT",
		flag: "🇮🇹",
		name: "Italiano"
	},
	{
		code: "el",
		label: "EL",
		flag: "🇬🇷",
		name: "Ελληνικά"
	},
	{
		code: "es",
		label: "ES",
		flag: "🇪🇸",
		name: "Español"
	}
];
function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const current = LANGUAGES.find((l) => l.code === i18n.language?.slice(0, 2)) ?? LANGUAGES[0];
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		function onClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);
	function select(code) {
		i18n.changeLanguage(code);
		setOpen(false);
	}
	const others = LANGUAGES.filter((l) => l.code !== current.code);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 cursor-pointer select-none transition-all duration-200",
			style: {
				fontFamily: "Satoshi, sans-serif",
				fontSize: 11,
				fontWeight: 700,
				background: open ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
				color: "#fff",
				border: "1px solid rgba(255,255,255,0.18)",
				lineHeight: 1
			},
			children: [/* @__PURE__ */ jsx("span", {
				style: {
					fontSize: 16,
					lineHeight: 1
				},
				children: current.flag
			}), /* @__PURE__ */ jsx("span", { children: current.label })]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .88,
				y: -8
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .88,
				y: -8
			},
			transition: {
				type: "spring",
				stiffness: 420,
				damping: 26
			},
			className: "absolute top-[calc(100%+8px)] right-0 z-50 flex flex-col gap-0.5 p-1.5 rounded-2xl mt-5 min-w-[160px]",
			style: {
				background: "rgba(10,20,46,0.92)",
				backdropFilter: "blur(24px)",
				border: "1px solid rgba(255,255,255,0.12)",
				boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)",
				transformOrigin: "top right"
			},
			children: others.map((lang, i) => /* @__PURE__ */ jsxs(motion.button, {
				type: "button",
				onClick: () => select(lang.code),
				initial: {
					opacity: 0,
					x: 6
				},
				animate: {
					opacity: 1,
					x: 0
				},
				transition: {
					type: "spring",
					stiffness: 380,
					damping: 28,
					delay: i * .035
				},
				className: "flex items-center gap-2.5 w-full rounded-xl px-3 py-2 cursor-pointer text-left transition-colors duration-150 hover:bg-white/10",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: [
					/* @__PURE__ */ jsx("span", {
						style: {
							fontSize: 18,
							lineHeight: 1
						},
						children: lang.flag
					}),
					/* @__PURE__ */ jsx("span", {
						style: {
							fontSize: 12,
							fontWeight: 700,
							color: "rgba(255,255,255,0.9)"
						},
						children: lang.label
					}),
					/* @__PURE__ */ jsx("span", {
						style: {
							fontSize: 11,
							color: "rgba(255,255,255,0.35)",
							marginLeft: "auto"
						},
						children: lang.name
					})
				]
			}, lang.code))
		}) })]
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/Navbar.tsx
var SPRING$3 = {
	type: "spring",
	stiffness: 400,
	damping: 32
};
var NAV_LINK_KEYS = [
	{
		to: "/",
		key: "home",
		end: true
	},
	{
		to: "/services",
		key: "services"
	},
	{
		to: "/destinations",
		key: "destinations"
	},
	{
		to: "/our-story",
		key: "our_story"
	},
	{
		to: "/reviews",
		key: "reviews"
	}
];
function GridIcon({ size = 16 }) {
	const gap = 2.5;
	const cell = (size - gap * 2) / 3;
	return /* @__PURE__ */ jsx("svg", {
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		fill: "currentColor",
		children: [
			0,
			1,
			2
		].flatMap((r) => [
			0,
			1,
			2
		].map((c) => /* @__PURE__ */ jsx("rect", {
			x: c * (cell + gap),
			y: r * (cell + gap),
			width: cell,
			height: cell,
			rx: "1"
		}, `${r}-${c}`)))
	});
}
function Navbar() {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 1.1);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: "fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4",
		children: /* @__PURE__ */ jsxs(motion.div, {
			animate: {
				paddingTop: scrolled ? 10 : 14,
				paddingBottom: scrolled ? 10 : 14,
				background: scrolled ? "rgba(13,27,56,0.92)" : "rgba(255,255,255,0.20)",
				borderColor: scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.50)",
				boxShadow: scrolled ? "0 20px 60px rgba(0,0,0,0.4)" : "0 0px 0px rgba(0,0,0,0)"
			},
			transition: {
				duration: .35,
				ease: "easeOut"
			},
			className: "pointer-events-auto border mt-4 flex items-center justify-between gap-2 px-5 rounded-full w-[calc(100vw-48px)] md:w-auto",
			style: {
				backdropFilter: "blur(80px) saturate(200%)",
				WebkitBackdropFilter: "blur(80px) saturate(200%)"
			},
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "shrink-0",
					children: /* @__PURE__ */ jsx("img", {
						src: "/assets/logo.png",
						alt: "Next Route Travels",
						className: "h-9 w-auto object-contain",
						style: { mixBlendMode: "screen" }
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden md:block w-px h-5 mx-2 shrink-0",
					style: { background: "rgba(255,255,255,0.15)" }
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden md:flex items-center gap-0.5",
					children: NAV_LINK_KEYS.map(({ to, key, end }) => /* @__PURE__ */ jsx(NavLink, {
						to,
						end,
						children: ({ isActive }) => /* @__PURE__ */ jsxs("div", {
							className: "relative px-3 py-1.5",
							children: [isActive && /* @__PURE__ */ jsx(motion.div, {
								layoutId: "nav-active-pill",
								className: "absolute inset-0 rounded-full bg-white",
								transition: {
									type: "spring",
									stiffness: 380,
									damping: 32
								}
							}), /* @__PURE__ */ jsx("span", {
								className: cn("relative z-10 text-[13px] font-semibold whitespace-nowrap", isActive ? "text-[#0d1b38]" : "text-white/60 hover:text-white"),
								style: {
									fontFamily: "Satoshi, sans-serif",
									transition: "color 0ms"
								},
								children: t(`nav.${key}`)
							})]
						})
					}, to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 ml-2",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "block",
							children: /* @__PURE__ */ jsx(LanguageSwitcher, {})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "hidden sm:block shrink-0",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/enquiries",
								children: /* @__PURE__ */ jsxs(motion.span, {
									className: `inline-flex items-center gap-2.5 pl-4 pr-1 py-1 rounded-full cursor-pointer transition-colors duration-300 ${scrolled ? "bg-white text-[#0d1b38] shadow-[0_8px_24px_-6px_rgba(255,255,255,.25)]" : "bg-[#0d1b38] text-white shadow-[0_8px_24px_-6px_rgba(13,27,56,.5)]"}`,
									variants: {
										rest: { y: 0 },
										hover: { y: -1 }
									},
									initial: "rest",
									whileHover: "hover",
									whileTap: { scale: .97 },
									transition: SPRING$3,
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[13px] font-semibold whitespace-nowrap",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: t("nav.book")
									}), /* @__PURE__ */ jsx(motion.span, {
										className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${scrolled ? "bg-[#0d1b38] text-white" : "bg-white text-[#0d1b38]"}`,
										variants: {
											rest: { x: 0 },
											hover: { x: 2 }
										},
										transition: SPRING$3,
										children: /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
										})
									})]
								})
							})
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setMobileOpen((v) => !v),
							"aria-label": "Toggle menu",
							className: "md:hidden flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white cursor-pointer",
							style: { transition: "color 150ms ease-in" },
							children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 16 }) : /* @__PURE__ */ jsx(GridIcon, { size: 15 })
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .15 },
		className: "fixed inset-0 z-40",
		style: {
			background: "rgba(0,0,0,0.2)",
			backdropFilter: "blur(4px)"
		},
		onClick: () => setMobileOpen(false)
	}, "backdrop"), /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: -8,
			scale: .97
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: -8,
			scale: .97
		},
		transition: {
			duration: .18,
			ease: "easeOut"
		},
		className: "fixed top-[76px] mt-4 left-4 right-4 z-[60] rounded-2xl p-3",
		style: {
			background: "rgba(13, 27, 56, 0.92)",
			backdropFilter: "blur(80px) saturate(200%)",
			WebkitBackdropFilter: "blur(80px) saturate(200%)",
			border: "1px solid rgba(255,255,255,0.1)",
			boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
			transition: "none"
		},
		children: /* @__PURE__ */ jsxs("nav", {
			className: "flex flex-col gap-1",
			children: [NAV_LINK_KEYS.map(({ to, key, end }) => /* @__PURE__ */ jsx(NavLink, {
				to,
				end,
				onClick: () => setMobileOpen(false),
				children: ({ isActive }) => /* @__PURE__ */ jsx("div", {
					className: cn("px-4 py-3 rounded-xl text-[15px] font-semibold", isActive ? "bg-white text-[#0d1b38]" : "text-white/60 hover:text-white hover:bg-white/10"),
					style: {
						fontFamily: "Satoshi, sans-serif",
						transition: "background 150ms, color 150ms"
					},
					children: t(`nav.${key}`)
				})
			}, to)), /* @__PURE__ */ jsx(Link, {
				to: "/enquiries",
				onClick: () => setMobileOpen(false),
				children: /* @__PURE__ */ jsxs(motion.div, {
					className: "mt-1 flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-white text-[#0d1b38] w-max cursor-pointer",
					variants: {
						rest: { y: 0 },
						hover: { y: -1 }
					},
					initial: "rest",
					whileHover: "hover",
					whileTap: { scale: .97 },
					transition: SPRING$3,
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex-1 text-[15px] font-bold",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: t("nav.book")
					}), /* @__PURE__ */ jsx(motion.span, {
						className: "w-9 h-9 rounded-full bg-[#0d1b38] text-white flex items-center justify-center shrink-0",
						variants: {
							rest: { x: 0 },
							hover: { x: 2 }
						},
						transition: SPRING$3,
						children: /* @__PURE__ */ jsx("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
						})
					})]
				})
			})]
		})
	}, "menu")] }) })] });
}
//#endregion
//#region src/components/SocialIcons.tsx
function InstagramIcon({ size = 16, color = "currentColor" }) {
	return /* @__PURE__ */ jsxs("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "5",
				ry: "5"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "17.5",
				cy: "6.5",
				r: "1",
				fill: color,
				stroke: "none"
			})
		]
	});
}
function XIcon({ size = 16, color = "currentColor" }) {
	return /* @__PURE__ */ jsx("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: color,
		children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
	});
}
function FacebookIcon({ size = 16, color = "currentColor" }) {
	return /* @__PURE__ */ jsx("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: color,
		children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
	});
}
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/Footer.tsx
var NAV_COLS = [
	{
		headingKey: "footer.explore_col",
		links: [
			{
				to: "/",
				labelKey: "nav.home"
			},
			{
				to: "/services",
				labelKey: "nav.services"
			},
			{
				to: "/destinations",
				labelKey: "nav.destinations"
			}
		]
	},
	{
		headingKey: "footer.company_col",
		links: [
			{
				to: "/our-story",
				labelKey: "nav.our_story"
			},
			{
				to: "/team",
				labelKey: "nav.team"
			},
			{
				to: "/reviews",
				labelKey: "nav.reviews"
			},
			{
				to: "/enquiries",
				labelKey: "nav.enquiries"
			}
		]
	},
	{
		headingKey: "footer.services_col",
		links: [
			{
				to: "/services",
				labelKey: "footer.flights"
			},
			{
				to: "/services",
				labelKey: "footer.road_travel_link"
			},
			{
				to: "/services",
				labelKey: "footer.expeditions"
			}
		]
	},
	{
		headingKey: "footer.destinations_col",
		links: [
			{
				to: "/destinations",
				labelKey: "footer.rome"
			},
			{
				to: "/destinations",
				labelKey: "footer.serengeti"
			},
			{
				to: "/destinations",
				labelKey: "footer.greek_islands"
			}
		]
	}
];
var SOCIAL = [
	{
		href: "https://instagram.com",
		label: "Instagram",
		Icon: InstagramIcon
	},
	{
		href: "https://twitter.com",
		label: "X (Twitter)",
		Icon: XIcon
	},
	{
		href: "https://facebook.com",
		label: "Facebook",
		Icon: FacebookIcon
	}
];
var CHAR_WIDTH_RATIO = 6.1;
function NextRouteWordmark() {
	const wrapperRef = useRef(null);
	const [fontSize, setFontSize] = useState(0);
	useEffect(() => {
		function measure() {
			if (!wrapperRef.current) return;
			const w = wrapperRef.current.offsetWidth;
			setFontSize(w / CHAR_WIDTH_RATIO);
		}
		document.fonts.ready.then(measure);
		const ro = new ResizeObserver(measure);
		if (wrapperRef.current) ro.observe(wrapperRef.current);
		return () => ro.disconnect();
	}, []);
	const visibleHeight = fontSize * .52;
	return /* @__PURE__ */ jsx("div", {
		ref: wrapperRef,
		className: "relative w-full overflow-hidden select-none pointer-events-none",
		style: { height: fontSize > 0 ? visibleHeight : 80 },
		"aria-hidden": true,
		children: fontSize > 0 && /* @__PURE__ */ jsx("p", {
			className: "absolute -top-5 left-0 font-black whitespace-nowrap",
			style: {
				fontFamily: "Clash Display, sans-serif",
				fontSize,
				lineHeight: 1,
				letterSpacing: "-0.02em",
				color: "rgba(255,255,255,0.05)"
			},
			children: "NEXT ROUTE"
		})
	});
}
function Footer() {
	const { t } = useTranslation();
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, {
		once: false,
		margin: "-60px"
	});
	const fade = (delay = 0) => ({
		initial: {
			opacity: 0,
			y: 28
		},
		animate: isInView ? {
			opacity: 1,
			y: 0
		} : {
			opacity: 0,
			y: 28
		},
		transition: {
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		}
	});
	const handleSend = () => {
		if (email) {
			setSent(true);
			setEmail("");
		}
	};
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-24 px-4 sm:px-6 pb-0",
		children: [/* @__PURE__ */ jsxs("div", {
			ref: cardRef,
			className: "max-w-5xl mx-auto rounded-3xl overflow-hidden",
			style: {
				background: "linear-gradient(160deg, #0d1b38 0%, #112248 60%, #0d1b38 100%)",
				border: "1px solid rgba(255,255,255,0.08)"
			},
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "px-8 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] gap-10",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						className: "space-y-6",
						...fade(0),
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								className: "block -ml-9",
								children: /* @__PURE__ */ jsx("img", {
									src: "/assets/logo.png",
									alt: "Next Route Travels",
									className: "h-12 w-auto object-contain",
									style: { mixBlendMode: "screen" }
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm max-w-[240px] leading-relaxed",
								style: {
									fontFamily: "Satoshi, sans-serif",
									color: "rgba(255,255,255,0.5)"
								},
								children: t("footer.tagline")
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-2",
								children: SOCIAL.map(({ href, label, Icon }) => /* @__PURE__ */ jsx("a", {
									href,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": label,
									className: "flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white transition-colors ease-in duration-[400ms]",
									style: {
										background: "rgba(255,255,255,0.08)",
										border: "1px solid rgba(255,255,255,0.08)"
									},
									children: /* @__PURE__ */ jsx(Icon, { size: 16 })
								}, href))
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "col-span-1 sm:col-span-2 lg:contents",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-x-0 gap-y-8 sm:contents",
							children: NAV_COLS.map(({ headingKey, links }, colIdx) => /* @__PURE__ */ jsxs(motion.div, {
								className: "w-1/2 sm:w-auto space-y-4",
								...fade(.1 + colIdx * .08),
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[12px] font-extrabold tracking-[0.2em] uppercase",
									style: {
										fontFamily: "Satoshi, sans-serif",
										color: "rgba(255,255,255,0.9)"
									},
									children: t(headingKey)
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-3",
									children: links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										to: link.to,
										className: "text-sm hover:text-white transition-colors ease-in duration-[400ms]",
										style: {
											fontFamily: "Satoshi, sans-serif",
											color: "rgba(255,255,255,0.45)"
										},
										children: t(link.labelKey)
									}) }, link.labelKey))
								})]
							}, headingKey))
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mx-8",
					style: { borderTop: "1px solid rgba(255,255,255,0.08)" }
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
					...fade(.18),
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-[12px]",
						style: {
							fontFamily: "Satoshi, sans-serif",
							color: "rgba(255,255,255,0.3)"
						},
						children: [
							sent ? t("footer.newsletter_success") : t("footer.copyright", { year }),
							" ",
							/* @__PURE__ */ jsx("span", {
								style: {
									color: "rgba(255,255,255,0.5)",
									fontWeight: 600
								},
								children: "BiTech."
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center w-full sm:w-[280px] rounded-full overflow-hidden",
						style: {
							background: "rgba(255,255,255,0.06)",
							border: "1px solid rgba(255,255,255,0.12)",
							height: 52
						},
						children: [/* @__PURE__ */ jsx(Input, {
							type: "email",
							placeholder: t("footer.newsletter_placeholder"),
							value: email,
							onChange: (e) => setEmail(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleSend(),
							className: "h-full flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 pl-5 pr-14 text-white/75 placeholder:text-white/25",
							style: { fontFamily: "Satoshi, sans-serif" }
						}), /* @__PURE__ */ jsxs(motion.button, {
							type: "button",
							onClick: handleSend,
							whileHover: "hover",
							className: "absolute right-1.5 flex items-center justify-center rounded-full shrink-0 cursor-pointer overflow-hidden bg-white",
							style: {
								width: 38,
								height: 38
							},
							"aria-label": "Subscribe",
							children: [/* @__PURE__ */ jsx(motion.span, {
								variants: { hover: {
									x: 14,
									y: -14,
									opacity: 0,
									transition: {
										duration: .18,
										ease: "easeIn"
									}
								} },
								animate: {
									x: [
										0,
										1.5,
										0
									],
									y: [
										0,
										-1.5,
										0
									]
								},
								transition: {
									duration: 1.4,
									repeat: Infinity,
									repeatDelay: 2.5,
									ease: "easeInOut"
								},
								className: "absolute flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Send, {
									size: 15,
									strokeWidth: 2,
									className: "text-[#0d1b38]"
								})
							}), /* @__PURE__ */ jsx(motion.span, {
								variants: { hover: {
									x: ["-100%", "0%"],
									y: ["100%", "0%"],
									opacity: [0, 1],
									transition: {
										duration: .22,
										ease: "easeOut",
										delay: .18
									}
								} },
								initial: {
									x: "-100%",
									y: "100%",
									opacity: 0
								},
								className: "absolute flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Send, {
									size: 15,
									strokeWidth: 2,
									className: "text-[#0d1b38]"
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "-ml-[20px]",
					...fade(.28),
					children: /* @__PURE__ */ jsx(NextRouteWordmark, {})
				})
			]
		}), /* @__PURE__ */ jsx("div", { className: "h-8" })]
	});
}
//#endregion
//#region src/assets/one.png
var one_default = "/assets/one-D4mdkIPM.png";
//#endregion
//#region src/components/CTABanner.tsx
function CTABanner() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx("div", {
		className: "px-4 lg:px-16 mt-15 md:my-24 max-w-6xl mx-auto",
		children: /* @__PURE__ */ jsxs(motion.div, {
			className: "relative rounded-3xl flex flex-col lg:flex-row lg:items-stretch overflow-hidden lg:overflow-visible",
			style: { background: "linear-gradient(135deg, #eef2ff 0%, #f8faff 55%, #eff6ff 100%)" },
			initial: {
				opacity: 0,
				y: 40
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: {
				once: false,
				margin: "200px 0px -100px 0px"
			},
			transition: {
				duration: .7,
				ease: [
					.25,
					.46,
					.45,
					.94
				]
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex flex-col justify-center lg:w-[55%] px-7 lg:px-16 py-10 lg:py-14",
				children: [
					/* @__PURE__ */ jsxs("h2", {
						className: "font-bold tracking-tight leading-[1.1]",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: [/* @__PURE__ */ jsx(motion.span, {
							className: "block text-3xl lg:text-5xl text-gray-900",
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: false },
							transition: {
								duration: .6,
								delay: .2,
								ease: [
									.25,
									.46,
									.45,
									.94
								]
							},
							children: t("cta_banner.heading1")
						}), /* @__PURE__ */ jsxs(motion.span, {
							className: "block text-3xl lg:text-5xl",
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: false },
							transition: {
								duration: .6,
								delay: .28,
								ease: [
									.25,
									.46,
									.45,
									.94
								]
							},
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-gray-900",
								children: [t("cta_banner.heading2"), " "]
							}), /* @__PURE__ */ jsx("span", {
								className: "bg-gradient-to-br from-blue-600 to-blue-900 bg-clip-text text-transparent",
								children: t("cta_banner.accent")
							})]
						})]
					}),
					/* @__PURE__ */ jsx(motion.p, {
						className: "mt-4 mb-10 text-sm lg:text-base leading-relaxed text-gray-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: false },
						transition: {
							duration: .5,
							delay: .4
						},
						children: t("cta_banner.sub")
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex flex-row items-center gap-3",
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: false },
						transition: {
							duration: .5,
							delay: .55
						},
						children: [/* @__PURE__ */ jsxs(Link, {
							to: "/enquiries",
							className: "justify-between gap-4 px-4 text-white inline-flex items-center rounded-full select-none hover:scale-[1.02] active:scale-[0.97] transition-transform duration-500",
							style: {
								height: 52,
								fontFamily: "Satoshi, sans-serif",
								fontSize: 15,
								fontWeight: 600,
								background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
								boxShadow: "0 8px 24px rgba(13,27,56,0.25)"
							},
							children: [/* @__PURE__ */ jsx("span", { children: t("cta_banner.book") }), /* @__PURE__ */ jsx("span", {
								className: "bg-white rounded-full p-2 text-slate-800",
								children: /* @__PURE__ */ jsx(ArrowUpRight, { size: 15 })
							})]
						}), /* @__PURE__ */ jsxs(Link, {
							to: "/services",
							className: "flex flex-col items-center gap-1.5 text-md font-bold group hover:cursor-pointer hover:text-slate-500 text-gray-700 transition-colors duration-200",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [/* @__PURE__ */ jsx("span", { children: t("cta_banner.explore") }), /* @__PURE__ */ jsx("hr", { className: "w-full h-0.5 bg-gray-300 -mt-2 hover:bg-gray-500" })]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:w-[45%] bg-gradient-to-br from-blue-950 via-slate-800 to-blue-900 flex items-center justify-center overflow-hidden py-6 lg:py-0 rounded-r-4xl",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-white h-10 w-10 rounded-[50%]" }), /* @__PURE__ */ jsxs(motion.div, {
					className: "relative w-[200px] lg:w-[260px]",
					animate: {
						y: [
							260,
							0,
							0,
							-13,
							0,
							-13,
							0,
							-13,
							0,
							-360
						],
						opacity: [
							0,
							1,
							1,
							1,
							1,
							1,
							1,
							1,
							1,
							0
						]
					},
					transition: {
						duration: 3.4,
						times: [
							0,
							.16,
							.24,
							.34,
							.44,
							.54,
							.64,
							.72,
							.8,
							1
						],
						ease: [
							"easeOut",
							"linear",
							"easeOut",
							"easeIn",
							"easeOut",
							"easeIn",
							"easeOut",
							"easeIn",
							"easeIn"
						],
						repeat: Infinity,
						repeatDelay: .3
					},
					children: [[
						[
							"27%",
							2,
							115,
							.32,
							.5,
							4
						],
						[
							"30%",
							3,
							140,
							.38,
							0,
							0
						],
						[
							"33%",
							2,
							115,
							.32,
							.5,
							-4
						],
						[
							"12%",
							1,
							85,
							.18,
							1,
							6
						],
						[
							"65%",
							2,
							115,
							.32,
							.5,
							4
						],
						[
							"68%",
							3,
							140,
							.38,
							0,
							0
						],
						[
							"71%",
							2,
							115,
							.32,
							.5,
							-4
						],
						[
							"87%",
							1,
							85,
							.18,
							1,
							-6
						]
					].map(([left, w, h, op, blur, rot], i) => /* @__PURE__ */ jsx("div", {
						className: "absolute pointer-events-none",
						style: {
							left,
							top: "50%",
							width: w,
							height: h,
							background: `linear-gradient(to bottom, rgba(255,255,255,${op}) 0%, rgba(210,228,255,${op * .4}) 55%, transparent 100%)`,
							filter: `blur(${blur}px)`,
							transform: `rotate(${rot}deg)`,
							transformOrigin: "top center"
						}
					}, i)), /* @__PURE__ */ jsx("img", {
						src: one_default,
						alt: "Aircraft",
						className: "w-full object-contain relative",
						style: {
							display: "block",
							filter: "drop-shadow(0 16px 28px rgba(13,27,56,0.16)) drop-shadow(0 3px 6px rgba(13,27,56,0.09))"
						}
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/ui/cobe-globe.tsx
function Globe({ markers = [], arcs = [], className = "", markerColor = [
	.3,
	.45,
	.85
], baseColor = [
	1,
	1,
	1
], arcColor = [
	.3,
	.45,
	.85
], glowColor = [
	.94,
	.93,
	.91
], dark = 0, mapBrightness = 10, markerSize = .025, markerElevation = .01, arcWidth = .5, arcHeight = .25, speed = .003, theta = .2, diffuse = 1.5, mapSamples = 16e3 }) {
	const canvasRef = useRef(null);
	const pointerInteracting = useRef(null);
	const lastPointer = useRef(null);
	const dragOffset = useRef({
		phi: 0,
		theta: 0
	});
	const velocity = useRef({
		phi: 0,
		theta: 0
	});
	const phiOffsetRef = useRef(0);
	const thetaOffsetRef = useRef(0);
	const isPausedRef = useRef(false);
	const handlePointerDown = useCallback((e) => {
		pointerInteracting.current = {
			x: e.clientX,
			y: e.clientY
		};
		if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
		isPausedRef.current = true;
	}, []);
	const handlePointerMove = useCallback((e) => {
		if (pointerInteracting.current !== null) {
			const deltaX = e.clientX - pointerInteracting.current.x;
			const deltaY = e.clientY - pointerInteracting.current.y;
			dragOffset.current = {
				phi: deltaX / 300,
				theta: deltaY / 1e3
			};
			const now = Date.now();
			if (lastPointer.current) {
				const dt = Math.max(now - lastPointer.current.t, 1);
				const maxVelocity = .15;
				velocity.current = {
					phi: Math.max(-.15, Math.min(maxVelocity, (e.clientX - lastPointer.current.x) / dt * .3)),
					theta: Math.max(-.15, Math.min(maxVelocity, (e.clientY - lastPointer.current.y) / dt * .08))
				};
			}
			lastPointer.current = {
				x: e.clientX,
				y: e.clientY,
				t: now
			};
		}
	}, []);
	const handlePointerUp = useCallback(() => {
		if (pointerInteracting.current !== null) {
			phiOffsetRef.current += dragOffset.current.phi;
			thetaOffsetRef.current += dragOffset.current.theta;
			dragOffset.current = {
				phi: 0,
				theta: 0
			};
			lastPointer.current = null;
		}
		pointerInteracting.current = null;
		if (canvasRef.current) canvasRef.current.style.cursor = "grab";
		isPausedRef.current = false;
	}, []);
	useEffect(() => {
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerup", handlePointerUp, { passive: true });
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
		};
	}, [handlePointerMove, handlePointerUp]);
	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		let globe = null;
		let animationId;
		let phi = 0;
		function init() {
			const width = canvas.offsetWidth;
			if (width === 0 || globe) return;
			globe = createGlobe(canvas, {
				devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
				width,
				height: width,
				phi: 0,
				theta,
				dark,
				diffuse,
				mapSamples,
				mapBrightness,
				baseColor,
				markerColor,
				glowColor,
				markerElevation,
				markers: markers.map((m) => ({
					location: m.location,
					size: markerSize,
					id: m.id
				})),
				arcs: arcs.map((a) => ({
					from: a.from,
					to: a.to,
					id: a.id
				})),
				arcColor,
				arcWidth,
				arcHeight,
				opacity: .7
			});
			function animate() {
				if (!isPausedRef.current) {
					phi += speed;
					if (Math.abs(velocity.current.phi) > 1e-4 || Math.abs(velocity.current.theta) > 1e-4) {
						phiOffsetRef.current += velocity.current.phi;
						thetaOffsetRef.current += velocity.current.theta;
						velocity.current.phi *= .95;
						velocity.current.theta *= .95;
					}
					const thetaMin = -.4, thetaMax = .4;
					if (thetaOffsetRef.current < thetaMin) thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * .1;
					else if (thetaOffsetRef.current > thetaMax) thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * .1;
				}
				globe.update({
					phi: phi + phiOffsetRef.current + dragOffset.current.phi,
					theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
					dark,
					mapBrightness,
					markerColor,
					baseColor,
					arcColor,
					markerElevation,
					markers: markers.map((m) => ({
						location: m.location,
						size: markerSize,
						id: m.id
					})),
					arcs: arcs.map((a) => ({
						from: a.from,
						to: a.to,
						id: a.id
					}))
				});
				animationId = requestAnimationFrame(animate);
			}
			animate();
			setTimeout(() => canvas && (canvas.style.opacity = "1"));
		}
		if (canvas.offsetWidth > 0) init();
		else {
			const ro = new ResizeObserver((entries) => {
				if (entries[0]?.contentRect.width > 0) {
					ro.disconnect();
					init();
				}
			});
			ro.observe(canvas);
		}
		return () => {
			if (animationId) cancelAnimationFrame(animationId);
			if (globe) globe.destroy();
		};
	}, [
		markers,
		arcs,
		markerColor,
		baseColor,
		arcColor,
		glowColor,
		dark,
		mapBrightness,
		markerSize,
		markerElevation,
		arcWidth,
		arcHeight,
		speed,
		theta,
		diffuse,
		mapSamples
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: `relative aspect-square select-none ${className}`,
		children: [
			/* @__PURE__ */ jsx("canvas", {
				ref: canvasRef,
				onPointerDown: handlePointerDown,
				style: {
					width: "100%",
					height: "100%",
					cursor: "grab",
					opacity: 0,
					transition: "opacity 1.2s ease",
					borderRadius: "50%",
					touchAction: "none"
				}
			}),
			markers.map((m) => /* @__PURE__ */ jsxs("div", {
				style: {
					position: "absolute",
					positionAnchor: `--cobe-${m.id}`,
					bottom: "anchor(top)",
					left: "anchor(center)",
					translate: "-50% 0",
					marginBottom: 10,
					padding: "3px 8px",
					background: "rgba(13,27,56,0.90)",
					backdropFilter: "blur(8px)",
					border: "1px solid rgba(168,204,232,0.22)",
					borderRadius: 6,
					color: "rgba(168,204,232,0.95)",
					fontFamily: "Satoshi, sans-serif",
					fontSize: "0.6rem",
					fontWeight: 600,
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
					opacity: `var(--cobe-visible-${m.id}, 0)`,
					filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 6px))`,
					transition: "opacity 0.5s ease, filter 0.5s ease"
				},
				children: [m.label, /* @__PURE__ */ jsx("span", { style: {
					position: "absolute",
					top: "100%",
					left: "50%",
					transform: "translate3d(-50%, -1px, 0)",
					border: "4px solid transparent",
					borderTopColor: "rgba(168,204,232,0.22)"
				} })]
			}, m.id)),
			arcs.filter((a) => a.label).map((a) => /* @__PURE__ */ jsxs("div", {
				style: {
					position: "absolute",
					positionAnchor: `--cobe-arc-${a.id}`,
					bottom: "anchor(top)",
					left: "anchor(center)",
					translate: "-50% 0",
					marginBottom: 8,
					padding: "2px 6px",
					background: "rgba(13,27,56,0.90)",
					border: "1px solid rgba(168,204,232,0.22)",
					borderRadius: 4,
					color: "rgba(168,204,232,0.85)",
					fontFamily: "Satoshi, sans-serif",
					fontSize: "0.6rem",
					fontWeight: 600,
					letterSpacing: "0.1em",
					textTransform: "uppercase",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					opacity: `var(--cobe-visible-arc-${a.id}, 0)`,
					filter: `blur(calc((1 - var(--cobe-visible-arc-${a.id}, 0)) * 8px))`,
					transition: "opacity 0.8s, filter 0.8s"
				},
				children: [a.label, /* @__PURE__ */ jsx("span", { style: {
					position: "absolute",
					top: "100%",
					left: "50%",
					transform: "translate3d(-50%, -1px, 0)",
					border: "4px solid transparent",
					borderTopColor: "rgba(168,204,232,0.22)"
				} })]
			}, a.id))
		]
	});
}
//#endregion
//#region src/components/sections/LocationsGlobe.tsx
var HUB = {
	name: "Lagos",
	lng: 3.3792,
	lat: 6.5244
};
var LOCATIONS = [
	{
		name: "London",
		city: "London",
		lng: -.1276,
		lat: 51.5074,
		type: "Flight",
		region: "Europe"
	},
	{
		name: "Dubai",
		city: "Dubai",
		lng: 55.2708,
		lat: 25.2048,
		type: "Flight",
		region: "Middle East"
	},
	{
		name: "New York",
		city: "New York",
		lng: -74.006,
		lat: 40.7128,
		type: "Flight",
		region: "Americas"
	},
	{
		name: "Nairobi",
		city: "Nairobi",
		lng: 36.8219,
		lat: -1.2921,
		type: "Expedition",
		region: "Africa"
	},
	{
		name: "Rome",
		city: "Rome",
		lng: 12.4964,
		lat: 41.9028,
		type: "Flight",
		region: "Europe"
	},
	{
		name: "Accra",
		city: "Accra",
		lng: -.2057,
		lat: 5.56,
		type: "Road Travel",
		region: "Africa"
	},
	{
		name: "São Paulo",
		city: "São Paulo",
		lng: -46.6333,
		lat: -23.5505,
		type: "Flight",
		region: "Americas"
	},
	{
		name: "Singapore",
		city: "Singapore",
		lng: 103.8198,
		lat: 1.3521,
		type: "Flight",
		region: "Asia"
	}
];
var EXTRA_DOTS = [
	{
		name: "Paris",
		lng: 2.3522,
		lat: 48.8566
	},
	{
		name: "Cape Town",
		lng: 18.4241,
		lat: -33.9249
	},
	{
		name: "Tokyo",
		lng: 139.6917,
		lat: 35.6895
	},
	{
		name: "Istanbul",
		lng: 28.9784,
		lat: 41.0082
	}
];
var COBE_MARKERS = [
	{
		id: "hub",
		location: [HUB.lat, HUB.lng],
		label: "Lagos"
	},
	...LOCATIONS.map((loc) => ({
		id: loc.name,
		location: [loc.lat, loc.lng],
		label: loc.name
	})),
	...EXTRA_DOTS.map((d) => ({
		id: d.name,
		location: [d.lat, d.lng],
		label: d.name
	}))
];
var COBE_ARCS = [...LOCATIONS.map((loc) => ({
	id: loc.name,
	from: [HUB.lat, HUB.lng],
	to: [loc.lat, loc.lng]
})), ...EXTRA_DOTS.map((d) => ({
	id: d.name,
	from: [HUB.lat, HUB.lng],
	to: [d.lat, d.lng]
}))];
var STATS = [
	{
		value: 12,
		suffix: "+",
		labelKey: "locations_globe.cities"
	},
	{
		value: 8,
		suffix: "+",
		labelKey: "locations_globe.countries"
	},
	{
		value: 3,
		suffix: "",
		labelKey: "locations_globe.continents"
	}
];
var TYPE_COLORS = {
	"Flight": "text-[#a8cce8]",
	"Road Travel": "text-emerald-400",
	"Expedition": "text-amber-400"
};
var TYPE_KEYS = {
	"Flight": "locations_globe.flight",
	"Road Travel": "locations_globe.road_travel",
	"Expedition": "locations_globe.expedition"
};
var REGION_KEYS$1 = {
	"Europe": "locations_globe.europe",
	"Middle East": "locations_globe.middle_east",
	"Americas": "locations_globe.americas",
	"Africa": "locations_globe.africa",
	"Asia": "locations_globe.asia"
};
var TICKER_ITEMS = [
	...LOCATIONS,
	...LOCATIONS,
	...LOCATIONS
];
function fadeUp$4(delay = 0) {
	return {
		initial: {
			opacity: 0,
			y: 36
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: false,
			margin: "200px 0px -80px 0px"
		},
		transition: {
			duration: .65,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		}
	};
}
function CountUp({ to, suffix }) {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: false,
		margin: "200px 0px -80px 0px"
	});
	const mv = useMotionValue(0);
	const spring = useSpring(mv, {
		stiffness: 60,
		damping: 20
	});
	const [val, setVal] = useState(0);
	useEffect(() => {
		mv.set(inView ? to : 0);
	}, [
		inView,
		mv,
		to
	]);
	useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);
	return /* @__PURE__ */ jsxs("span", {
		ref,
		children: [val, suffix]
	});
}
function GlobeMap() {
	return /* @__PURE__ */ jsx("div", {
		className: "w-full aspect-square max-w-[560px] mx-auto lg:max-w-none",
		children: /* @__PURE__ */ jsx(Globe, {
			markers: COBE_MARKERS,
			arcs: COBE_ARCS,
			dark: 1,
			baseColor: [
				.07,
				.14,
				.3
			],
			markerColor: [
				.29,
				.55,
				.85
			],
			arcColor: [
				.66,
				.8,
				.93
			],
			glowColor: [
				.05,
				.16,
				.45
			],
			mapBrightness: 4,
			mapSamples: 2e4,
			markerSize: .04,
			markerElevation: .01,
			arcWidth: 1.2,
			arcHeight: .32,
			speed: .004,
			theta: .15,
			diffuse: 1.2,
			className: "w-full"
		})
	});
}
function TickerRow({ loc }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs(motion.div, {
		className: "group flex items-center justify-between py-3 px-1 border-b border-white/[0.07] select-none",
		whileHover: { x: 6 },
		transition: {
			type: "spring",
			stiffness: 420,
			damping: 32
		},
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2.5",
			children: [/* @__PURE__ */ jsx(motion.svg, {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "#a8cce8",
				strokeWidth: "2.5",
				className: "shrink-0",
				whileHover: {
					x: 2,
					y: -2
				},
				transition: {
					type: "spring",
					stiffness: 420,
					damping: 32
				},
				children: /* @__PURE__ */ jsx("path", { d: "M7 17L17 7M17 7H7M17 7v10" })
			}), /* @__PURE__ */ jsx("span", {
				className: "text-[14px] font-semibold text-white/85 group-hover:text-white transition-colors duration-150",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: loc.name
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: `text-[11px] font-semibold tabular-nums ${TYPE_COLORS[loc.type] ?? "text-white/40"}`,
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t(TYPE_KEYS[loc.type] ?? loc.type)
			}), /* @__PURE__ */ jsx("span", {
				className: "text-[11px] text-white/25",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t(REGION_KEYS$1[loc.region] ?? loc.region)
			})]
		})]
	});
}
function LocationsGlobe() {
	const { t } = useTranslation();
	const [tickerPaused, setTickerPaused] = useState(false);
	return /* @__PURE__ */ jsxs("section", {
		className: "relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden",
		children: [/* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none hidden lg:block absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full",
			style: { background: "radial-gradient(circle, rgba(26,53,102,0.7) 0%, transparent 68%)" }
		}), /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "w-full lg:w-[52%] shrink-0",
					initial: {
						opacity: 0,
						scale: .86,
						x: -32
					},
					whileInView: {
						opacity: 1,
						scale: 1,
						x: 0
					},
					viewport: {
						once: false,
						margin: "200px 0px -80px 0px"
					},
					transition: {
						duration: .95,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ jsx(GlobeMap, {})
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-full lg:w-[45%] flex flex-col gap-8",
					children: [
						/* @__PURE__ */ jsx(motion.p, {
							className: "text-[10px] font-bold tracking-[0.32em] uppercase text-white/35",
							style: { fontFamily: "Satoshi, sans-serif" },
							...fadeUp$4(.08),
							children: t("locations_globe.label")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "-mt-4",
							children: [/* @__PURE__ */ jsxs(motion.h2, {
								className: "text-[2.6rem] sm:text-[3.4rem] font-black leading-[0.98] tracking-tight text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								...fadeUp$4(.16),
								children: [t("locations_globe.heading"), /* @__PURE__ */ jsx("span", {
									className: "text-[#a8cce8]",
									children: "."
								})]
							}), /* @__PURE__ */ jsx(motion.p, {
								className: "mt-4 text-[15px] text-white/45 leading-relaxed max-w-sm",
								style: { fontFamily: "Satoshi, sans-serif" },
								...fadeUp$4(.24),
								children: t("locations_globe.body")
							})]
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "relative h-[232px] overflow-hidden rounded-xl",
							style: { maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)" },
							...fadeUp$4(.32),
							children: /* @__PURE__ */ jsx("div", {
								className: "ticker-track",
								style: { animationPlayState: tickerPaused ? "paused" : "running" },
								onMouseEnter: () => setTickerPaused(true),
								onMouseLeave: () => setTickerPaused(false),
								children: TICKER_ITEMS.map((loc, i) => /* @__PURE__ */ jsx(TickerRow, { loc }, `${loc.name}-${i}`))
							})
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "flex items-start justify-center lg:justify-start pt-2",
							...fadeUp$4(.42),
							children: STATS.map((stat, i) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-stretch",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center lg:items-start gap-1.5 px-7 first:pl-0 lg:first:pl-0",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[2.2rem] font-black text-white leading-none tabular-nums",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: /* @__PURE__ */ jsx(CountUp, {
											to: stat.value,
											suffix: stat.suffix
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold uppercase tracking-[0.22em] text-white/35",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: t(stat.labelKey)
									})]
								}), i < STATS.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-px self-stretch bg-white/10" })]
							}, stat.labelKey))
						})
					]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/sections/Hero.tsx
var DESTINATIONS$1 = [
	{
		name: "Rome",
		country: "Italy",
		code: "FCO",
		region: "Europe",
		coords: "41.90°N · 12.49°E",
		season: "Best · Apr–Jun",
		accent: "#f1c290",
		blurb: "Cobblestones, espresso bars, and 2,500 years of stories under the same sun.",
		silhouette: "rome",
		photo: {
			src: "/assets/rome.png",
			objectPos: "center bottom"
		}
	},
	{
		name: "Serengeti",
		country: "Tanzania",
		code: "JRO",
		region: "Africa",
		coords: "02.33°S · 34.83°E",
		season: "Migration · Jul–Oct",
		accent: "#f0c060",
		blurb: "Endless plains, dust at sunset, and the loudest silence you will ever hear.",
		silhouette: "serengeti",
		photo: {
			src: "/assets/Serengeti.jpeg",
			objectPos: "center bottom"
		}
	},
	{
		name: "Santorini",
		country: "Greece",
		code: "JTR",
		region: "Europe",
		coords: "36.39°N · 25.46°E",
		season: "Best · May–Sep",
		accent: "#a8cce8",
		blurb: "White cubes spilling down the caldera, and a sea so blue it looks invented.",
		silhouette: "santorini",
		photo: {
			src: "/assets/greece.jpeg",
			objectPos: "center bottom"
		}
	},
	{
		name: "Dubai",
		country: "UAE",
		code: "DXB",
		region: "Middle East",
		coords: "25.27°N · 55.30°E",
		season: "Best · Nov–Mar",
		accent: "#f5d27a",
		blurb: "Glass spires above golden dunes–luxury that still smells of cardamom and sand.",
		silhouette: "dubai",
		photo: {
			src: "/assets/dubai.png",
			objectPos: "center bottom"
		}
	},
	{
		name: "London",
		country: "United Kingdom",
		code: "LHR",
		region: "Europe",
		coords: "51.47°N · 00.45°W",
		season: "Best · May–Sep",
		accent: "#cdd9e6",
		blurb: "Rainy afternoons that smell like tea, and a skyline carved from old stone.",
		silhouette: "london",
		photo: {
			src: "/assets/london-bridge.png",
			objectPos: "center 60%"
		}
	},
	{
		name: "Accra",
		country: "Ghana",
		code: "ACC",
		region: "Africa",
		coords: "05.55°N · 00.20°W",
		season: "Best · Nov–Mar",
		accent: "#86e2cf",
		blurb: "Coastal warmth, brass-band Sundays, and a city that hums in highlife.",
		silhouette: "accra",
		photo: {
			src: "/assets/accra.jpeg",
			objectPos: "center bottom"
		}
	}
];
var CYCLE_MS = 7e3;
function Silhouette({ id, className = "" }) {
	const back = { fill: "rgba(0,0,0,0.18)" };
	const mid = { fill: "rgba(0,0,0,0.42)" };
	const fore = { fill: "rgba(0,0,0,0.78)" };
	const dark = { fill: "rgba(0,0,0,0.92)" };
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 1600 520",
		preserveAspectRatio: "xMidYEnd meet",
		className,
		"aria-hidden": "true",
		children: {
			rome: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsxs("g", {
					...back,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "120",
							y: "380",
							width: "180",
							height: "140"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "60",
							y: "420",
							width: "80",
							height: "100"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1340",
							y: "400",
							width: "120",
							height: "120"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1480",
							y: "430",
							width: "90",
							height: "90"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...mid,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "200",
							y: "350",
							width: "240",
							height: "170"
						}),
						/* @__PURE__ */ jsx("path", {
							d: "M225 460 L225 400 Q245 380 265 400 L265 460 Z",
							fill: "rgba(255,255,255,0.10)"
						}),
						/* @__PURE__ */ jsx("path", {
							d: "M295 460 L295 400 Q315 380 335 400 L335 460 Z",
							fill: "rgba(255,255,255,0.10)"
						}),
						/* @__PURE__ */ jsx("path", {
							d: "M365 460 L365 400 Q385 380 405 400 L405 460 Z",
							fill: "rgba(255,255,255,0.10)"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "200",
							y: "345",
							width: "240",
							height: "14"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "200",
							y: "340",
							width: "14",
							height: "180"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "426",
							y: "340",
							width: "14",
							height: "180"
						})
					]
				}),
				/* @__PURE__ */ jsx("g", {
					...fore,
					children: /* @__PURE__ */ jsx("path", { d: "M500 520 L500 370 Q500 220 800 200 Q1100 220 1100 370 L1100 520 Z" })
				}),
				/* @__PURE__ */ jsxs("g", {
					fill: "rgba(255,255,255,0.10)",
					children: [
						Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("rect", {
							x: 525 + i * 41,
							y: 420,
							width: 26,
							height: 50,
							rx: 13
						}, `r1-${i}`)),
						Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("rect", {
							x: 525 + i * 41,
							y: 355,
							width: 26,
							height: 45,
							rx: 13
						}, `r2-${i}`)),
						Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("rect", {
							x: 525 + i * 41,
							y: 295,
							width: 26,
							height: 40,
							rx: 13
						}, `r3-${i}`)),
						Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("rect", {
							x: 535 + i * 41,
							y: 245,
							width: 14,
							height: 28
						}, `r4-${i}`))
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "510",
					width: "1600",
					height: "10",
					...fore
				})
			] }),
			serengeti: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("g", {
					...back,
					children: /* @__PURE__ */ jsx("path", { d: "M0 470 L200 410 L420 460 L640 400 L900 450 L1180 390 L1440 440 L1600 410 L1600 520 L0 520 Z" })
				}),
				/* @__PURE__ */ jsxs("g", {
					...mid,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "1240",
							y: "440",
							width: "3",
							height: "70"
						}),
						/* @__PURE__ */ jsx("ellipse", {
							cx: "1241",
							cy: "436",
							rx: "40",
							ry: "6"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "160",
							y: "450",
							width: "2",
							height: "60"
						}),
						/* @__PURE__ */ jsx("ellipse", {
							cx: "161",
							cy: "446",
							rx: "28",
							ry: "4"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...fore,
					children: [
						/* @__PURE__ */ jsxs("g", {
							transform: "translate(1380,440)",
							children: [
								/* @__PURE__ */ jsx("rect", {
									x: "0",
									y: "-50",
									width: "6",
									height: "50"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "0",
									y: "-58",
									width: "22",
									height: "6"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "20",
									y: "-72",
									width: "4",
									height: "18"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-30",
									y: "-30",
									width: "34",
									height: "3"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-30",
									y: "-30",
									width: "3",
									height: "32"
								})
							]
						}),
						/* @__PURE__ */ jsxs("g", {
							transform: "translate(1050,488)",
							children: [
								/* @__PURE__ */ jsx("ellipse", {
									cx: "0",
									cy: "0",
									rx: "30",
									ry: "14"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-22",
									y: "-2",
									width: "6",
									height: "18"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-10",
									y: "-2",
									width: "6",
									height: "18"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "8",
									y: "-2",
									width: "6",
									height: "18"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "20",
									y: "-2",
									width: "6",
									height: "18"
								}),
								/* @__PURE__ */ jsx("path", { d: "M-32 -8 Q-44 -4 -40 8" })
							]
						}),
						/* @__PURE__ */ jsxs("g", {
							transform: "translate(1110,492)",
							children: [
								/* @__PURE__ */ jsx("ellipse", {
									cx: "0",
									cy: "0",
									rx: "22",
									ry: "10"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-16",
									y: "-1",
									width: "5",
									height: "13"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "-6",
									y: "-1",
									width: "5",
									height: "13"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "4",
									y: "-1",
									width: "5",
									height: "13"
								}),
								/* @__PURE__ */ jsx("rect", {
									x: "14",
									y: "-1",
									width: "5",
									height: "13"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...dark,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "630",
							y: "330",
							width: "8",
							height: "190"
						}),
						/* @__PURE__ */ jsx("path", { d: "M610 340 Q620 320 634 322 L634 350 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M634 330 Q660 320 680 332 L634 348 Z" }),
						/* @__PURE__ */ jsx("ellipse", {
							cx: "634",
							cy: "310",
							rx: "200",
							ry: "20"
						}),
						/* @__PURE__ */ jsx("ellipse", {
							cx: "634",
							cy: "295",
							rx: "170",
							ry: "14"
						}),
						/* @__PURE__ */ jsx("ellipse", {
							cx: "634",
							cy: "282",
							rx: "130",
							ry: "9"
						})
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "514",
					width: "1600",
					height: "6",
					...dark
				})
			] }),
			santorini: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsxs("g", {
					...back,
					children: [/* @__PURE__ */ jsx("path", { d: "M0 470 L300 440 L640 460 L900 430 L1240 450 L1600 425 L1600 520 L0 520 Z" }), /* @__PURE__ */ jsxs("g", {
						transform: "translate(1380,460)",
						fill: "rgba(0,0,0,0.30)",
						children: [
							/* @__PURE__ */ jsx("path", { d: "M0 0 L14 -22 L14 0 Z" }),
							/* @__PURE__ */ jsx("path", { d: "M-6 2 L26 2 L20 8 L0 8 Z" }),
							/* @__PURE__ */ jsx("rect", {
								x: "13",
								y: "-22",
								width: "1.5",
								height: "22"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("g", {
					...mid,
					children: /* @__PURE__ */ jsx("path", { d: "M0 360 L120 340 L240 320 L400 290 L580 270 L760 250 L940 280 L1140 300 L1340 340 L1500 360 L1600 380 L1600 520 L0 520 Z" })
				}),
				/* @__PURE__ */ jsxs("g", {
					fill: "rgba(255,255,255,0.92)",
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "280",
							y: "270",
							width: "80",
							height: "40"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "300",
							y: "252",
							width: "50",
							height: "22"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "240",
							y: "290",
							width: "60",
							height: "30"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "360",
							y: "280",
							width: "50",
							height: "40"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "500",
							y: "240",
							width: "100",
							height: "38"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "520",
							y: "220",
							width: "60",
							height: "24"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "460",
							y: "262",
							width: "50",
							height: "28"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "600",
							y: "252",
							width: "60",
							height: "40"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "800",
							y: "230",
							width: "120",
							height: "42"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "820",
							y: "208",
							width: "80",
							height: "26"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "930",
							y: "248",
							width: "60",
							height: "36"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "770",
							y: "252",
							width: "40",
							height: "30"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1080",
							y: "270",
							width: "110",
							height: "40"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1100",
							y: "252",
							width: "70",
							height: "22"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1200",
							y: "290",
							width: "60",
							height: "30"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1300",
							y: "310",
							width: "80",
							height: "34"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1320",
							y: "294",
							width: "50",
							height: "20"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					fill: "rgba(74,144,217,0.95)",
					children: [
						/* @__PURE__ */ jsx("path", { d: "M338 252 Q355 222 372 252 L372 270 L338 270 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M548 220 Q575 188 602 220 L602 244 L548 244 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M848 208 Q885 170 920 208 L920 234 L848 234 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M1118 252 Q1140 224 1162 252 L1162 270 L1118 270 Z" })
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					fill: "rgba(255,255,255,0.96)",
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "884",
							y: "160",
							width: "3",
							height: "14"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "879",
							y: "166",
							width: "13",
							height: "3"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "582",
							y: "180",
							width: "2.5",
							height: "10"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "700",
							y: "200",
							width: "14",
							height: "50"
						}),
						/* @__PURE__ */ jsx("path", { d: "M698 196 L716 196 L707 184 Z" })
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "514",
					width: "1600",
					height: "6",
					...dark
				})
			] }),
			dubai: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsxs("mask", {
					id: "crescent",
					children: [/* @__PURE__ */ jsx("rect", {
						width: "1600",
						height: "520",
						fill: "white"
					}), /* @__PURE__ */ jsx("circle", {
						cx: "1394",
						cy: "92",
						r: "28",
						fill: "black"
					})]
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "1380",
					cy: "100",
					r: "32",
					fill: "rgba(255,255,255,0.32)",
					mask: "url(#crescent)"
				}),
				/* @__PURE__ */ jsxs("g", {
					...back,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "0",
							y: "380",
							width: "80",
							height: "140"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "90",
							y: "350",
							width: "60",
							height: "170"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "160",
							y: "370",
							width: "50",
							height: "150"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1480",
							y: "370",
							width: "60",
							height: "150"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1550",
							y: "350",
							width: "50",
							height: "170"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...mid,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "220",
							y: "330",
							width: "80",
							height: "190"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "310",
							y: "300",
							width: "60",
							height: "220"
						}),
						/* @__PURE__ */ jsx("path", { d: "M380 520 L380 310 L410 290 L440 310 L440 520 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "1200",
							y: "320",
							width: "70",
							height: "200"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1280",
							y: "290",
							width: "80",
							height: "230"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1380",
							y: "320",
							width: "60",
							height: "200"
						}),
						/* @__PURE__ */ jsx("path", { d: "M1100 520 L1100 360 Q1140 240 1180 360 L1180 520 Z" })
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...fore,
					children: [
						/* @__PURE__ */ jsx("path", { d: "M788 80 L812 80 L820 520 L780 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M770 520 L770 150 L788 150 L788 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M812 520 L812 150 L830 150 L830 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M752 520 L752 220 L770 220 L770 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M830 520 L830 220 L848 220 L848 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M730 520 L730 280 L752 280 L752 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M848 520 L848 280 L870 280 L870 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M710 520 L710 340 L730 340 L730 520 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M870 520 L870 340 L890 340 L890 520 Z" })
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "797",
					y: "40",
					width: "6",
					height: "44",
					...dark
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "800",
					cy: "36",
					r: "3",
					fill: "rgba(255,255,255,0.7)"
				}),
				/* @__PURE__ */ jsx("g", {
					fill: "rgba(255,255,255,0.22)",
					children: Array.from({ length: 22 }).map((_, i) => /* @__PURE__ */ jsx("rect", {
						x: "788",
						y: 120 + i * 17,
						width: "24",
						height: "2"
					}, i))
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "514",
					width: "1600",
					height: "6",
					...dark
				})
			] }),
			london: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsxs("g", {
					...back,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "60",
							y: "370",
							width: "50",
							height: "150"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "120",
							y: "350",
							width: "60",
							height: "170"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "190",
							y: "380",
							width: "44",
							height: "140"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1440",
							y: "380",
							width: "50",
							height: "140"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1500",
							y: "350",
							width: "60",
							height: "170"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...mid,
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "240",
							cy: "290",
							r: "130",
							fill: "none",
							stroke: "rgba(0,0,0,0.42)",
							strokeWidth: "6"
						}),
						Array.from({ length: 16 }).map((_, i) => {
							const a = i * Math.PI * 2 / 16;
							return /* @__PURE__ */ jsx("line", {
								x1: 240,
								y1: 290,
								x2: 240 + Math.cos(a) * 130,
								y2: 290 + Math.sin(a) * 130,
								stroke: "rgba(0,0,0,0.25)",
								strokeWidth: "2"
							}, i);
						}),
						/* @__PURE__ */ jsx("path", { d: "M210 290 L240 520 L270 290 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "500",
							y: "370",
							width: "500",
							height: "150"
						}),
						Array.from({ length: 9 }).map((_, i) => {
							const x = 520 + i * 56;
							return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
								x,
								y: 340,
								width: 28,
								height: 32
							}), /* @__PURE__ */ jsx("path", { d: `M${x} 340 L${x + 14} 320 L${x + 28} 340 Z` })] }, i);
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...fore,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "1050",
							y: "160",
							width: "58",
							height: "360"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1042",
							y: "200",
							width: "74",
							height: "60"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "1079",
							cy: "230",
							r: "22",
							fill: "rgba(255,255,255,0.92)"
						}),
						/* @__PURE__ */ jsx("line", {
							x1: "1079",
							y1: "230",
							x2: "1079",
							y2: "214",
							stroke: "rgba(0,0,0,0.85)",
							strokeWidth: "2.5"
						}),
						/* @__PURE__ */ jsx("line", {
							x1: "1079",
							y1: "230",
							x2: "1090",
							y2: "230",
							stroke: "rgba(0,0,0,0.85)",
							strokeWidth: "2.5"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1042",
							y: "260",
							width: "74",
							height: "14"
						}),
						/* @__PURE__ */ jsx("path", { d: "M1050 160 L1079 100 L1108 160 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "1076",
							y: "80",
							width: "6",
							height: "22"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "1079",
							cy: "76",
							r: "4",
							fill: "rgba(255,255,255,0.7)"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...mid,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "1230",
							y: "280",
							width: "44",
							height: "240"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1340",
							y: "280",
							width: "44",
							height: "240"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1224",
							y: "270",
							width: "56",
							height: "14"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1334",
							y: "270",
							width: "56",
							height: "14"
						}),
						/* @__PURE__ */ jsx("path", { d: "M1224 270 L1252 240 L1280 270 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M1334 270 L1362 240 L1390 270 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "1274",
							y: "290",
							width: "66",
							height: "6"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1274",
							y: "380",
							width: "66",
							height: "6"
						})
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "514",
					width: "1600",
					height: "6",
					...dark
				})
			] }),
			accra: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "490",
					width: "1600",
					height: "20",
					fill: "rgba(0,0,0,0.22)"
				}),
				/* @__PURE__ */ jsxs("g", {
					...back,
					children: [
						/* @__PURE__ */ jsxs("g", {
							transform: "translate(1340,488)",
							children: [
								/* @__PURE__ */ jsx("path", { d: "M0 0 L16 -28 L16 0 Z" }),
								/* @__PURE__ */ jsx("path", { d: "M-10 2 L36 2 L28 10 L0 10 Z" }),
								/* @__PURE__ */ jsx("rect", {
									x: "14.5",
									y: "-30",
									width: "2",
									height: "30"
								})
							]
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "80",
							y: "400",
							width: "60",
							height: "120"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "150",
							y: "380",
							width: "50",
							height: "140"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "210",
							y: "410",
							width: "40",
							height: "110"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1440",
							y: "400",
							width: "50",
							height: "120"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "1500",
							y: "380",
							width: "60",
							height: "140"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...fore,
					children: [
						/* @__PURE__ */ jsx("path", { d: "M540 520 L540 360 Q800 200 1060 360 L1060 520 L1000 520 L1000 380 Q800 270 600 380 L600 520 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "500",
							y: "500",
							width: "600",
							height: "20"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "470",
							y: "510",
							width: "660",
							height: "10"
						}),
						/* @__PURE__ */ jsx("g", {
							transform: "translate(800,210)",
							fill: "rgba(0,0,0,0.95)",
							children: /* @__PURE__ */ jsx("path", { d: "M0 -30 L8 -10 L30 -10 L13 4 L20 26 L0 14 L-20 26 L-13 4 L-30 -10 L-8 -10 Z" })
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "797",
							y: "230",
							width: "6",
							height: "130"
						})
					]
				}),
				/* @__PURE__ */ jsxs("g", {
					...dark,
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "220",
							y: "300",
							width: "6",
							height: "220"
						}),
						/* @__PURE__ */ jsx("path", { d: "M223 300 Q170 270 130 290 Q175 286 218 305 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M223 300 Q276 270 316 290 Q271 286 228 305 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M223 300 Q200 250 160 230 Q210 254 224 305 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M223 300 Q246 250 286 230 Q236 254 222 305 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M223 300 Q205 240 185 200 Q220 244 226 305 Z" }),
						/* @__PURE__ */ jsx("rect", {
							x: "1340",
							y: "320",
							width: "6",
							height: "200"
						}),
						/* @__PURE__ */ jsx("path", { d: "M1343 320 Q1290 290 1250 310 Q1295 306 1338 325 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M1343 320 Q1396 290 1436 310 Q1391 306 1348 325 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M1343 320 Q1320 270 1280 250 Q1330 274 1344 325 Z" }),
						/* @__PURE__ */ jsx("path", { d: "M1343 320 Q1366 270 1406 250 Q1356 274 1342 325 Z" })
					]
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "514",
					width: "1600",
					height: "6",
					...dark
				})
			] })
		}[id]
	});
}
var SPRING$2 = {
	type: "spring",
	stiffness: 400,
	damping: 32
};
var SERVICES = [
	{
		id: "flight",
		labelKey: "hero.flight_label",
		noteKey: "hero.flight_note",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: /* @__PURE__ */ jsx("path", { d: "M10.18 9 2 11l2 3 3-1 4 4-1.4 4.2L11 22l3-6 6-3a2 2 0 1 0-2-2l-3 1.5L9 8l1-3.5L8 3 6 7l-1 1z" })
		})
	},
	{
		id: "road",
		labelKey: "hero.road_label",
		noteKey: "hero.road_note",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: [
				/* @__PURE__ */ jsx("path", { d: "M5 17V11l2-5h10l2 5v6M5 17h14M5 17v2M19 17v2" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "8",
					cy: "17",
					r: "1.5"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "16",
					cy: "17",
					r: "1.5"
				})
			]
		})
	},
	{
		id: "expedition",
		labelKey: "hero.expedition_label",
		noteKey: "hero.expedition_note",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}), /* @__PURE__ */ jsx("path", { d: "M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" })]
		})
	}
];
function JourneyStartCTA() {
	const { t } = useTranslation();
	const [active, setActive] = useState("flight");
	return /* @__PURE__ */ jsx("div", {
		className: "relative z-20 -mt-[210px] sm:-mt-[200px] pb-24 px-4 sm:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1180px]",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				className: "bg-white rounded-[24px] shadow-[0_30px_80px_-20px_rgba(13,27,56,.45)] p-5 sm:p-7 border border-black/[0.04]",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					ease: [
						.22,
						1,
						.36,
						1
					],
					delay: .15
				},
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-black/[0.06]",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10.5px] tracking-[0.28em] uppercase text-[#6b7a8d] mb-0.5",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("hero.cta_label")
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[17px] font-bold text-[#0d1b38]",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("hero.cta_how")
						})] }), /* @__PURE__ */ jsx("span", {
							className: "text-[11px] tracking-[0.2em] uppercase text-[#6b7a8d] crosshair hidden sm:inline",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("hero.cta_confirmation")
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 grid grid-cols-3 gap-3",
						children: SERVICES.map((s) => /* @__PURE__ */ jsxs(motion.button, {
							type: "button",
							onClick: () => setActive(s.id),
							className: "relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border cursor-pointer overflow-hidden",
							style: { borderColor: active === s.id ? "transparent" : "rgba(0,0,0,0.06)" },
							whileHover: { y: -1 },
							whileTap: { scale: .97 },
							transition: SPRING$2,
							children: [
								active === s.id && /* @__PURE__ */ jsx(motion.div, {
									layoutId: "journey-service-pill",
									className: "absolute inset-0 rounded-2xl bg-[#0d1b38]",
									transition: SPRING$2
								}),
								/* @__PURE__ */ jsx("span", {
									className: `relative z-10 ${active === s.id ? "text-white" : "text-[#1a2f5a]"}`,
									children: s.icon
								}),
								/* @__PURE__ */ jsx("span", {
									className: `relative z-10 text-[13px] font-semibold ${active === s.id ? "text-white" : "text-[#1a2f5a]"}`,
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t(s.labelKey)
								}),
								/* @__PURE__ */ jsx("span", {
									className: `relative z-10 text-[11px] hidden sm:block ${active === s.id ? "text-white/55" : "text-[#6b7a8d]"}`,
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t(s.noteKey)
								})
							]
						}, s.id))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex flex-wrap items-center gap-4 justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-[12px] text-[#6b7a8d]",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" }), t("hero.cta_no_booking")]
						}), /* @__PURE__ */ jsx(Link, {
							to: "/enquiries",
							children: /* @__PURE__ */ jsxs(motion.span, {
								className: "inline-flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-[#0d1b38] text-white shadow-[0_12px_30px_-6px_rgba(13,27,56,.45)] cursor-pointer",
								variants: {
									rest: { y: 0 },
									hover: { y: -1 }
								},
								initial: "rest",
								whileHover: "hover",
								whileTap: { scale: .97 },
								transition: SPRING$2,
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[13.5px] font-medium",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("hero.cta_send")
								}), /* @__PURE__ */ jsx(motion.span, {
									className: "w-9 h-9 rounded-full bg-white text-[#0d1b38] flex items-center justify-center",
									variants: {
										rest: { x: 0 },
										hover: { x: 3 }
									},
									transition: SPRING$2,
									children: /* @__PURE__ */ jsx("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
									})
								})]
							})
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-5 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#6b7a8d]",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-5",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx("svg", {
								width: "13",
								height: "13",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.8",
								children: /* @__PURE__ */ jsx("path", { d: "M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" })
							}), t("hero.cta_iata")]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsxs("svg", {
								width: "13",
								height: "13",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.8",
								children: [/* @__PURE__ */ jsx("circle", {
									cx: "12",
									cy: "12",
									r: "9"
								}), /* @__PURE__ */ jsx("path", { d: "M12 7v5l3 2" })]
							}), t("hero.cta_support")]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx("svg", {
								width: "13",
								height: "13",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.8",
								children: /* @__PURE__ */ jsx("path", { d: "M12 2v20M5 9l7-7 7 7M5 15l7 7 7-7" })
							}), t("hero.cta_price")]
						})
					]
				}), /* @__PURE__ */ jsx("a", {
					className: "underline underline-offset-4 hover:text-[#1a2f5a] cursor-pointer",
					href: "/enquiries",
					children: t("hero.cta_whatsapp")
				})]
			})]
		})
	});
}
function Hero() {
	const { t } = useTranslation();
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const fillRefs = useRef([]);
	const elapsedRef = useRef(0);
	const jumpTo = (i) => {
		elapsedRef.current = 0;
		setIndex(i);
	};
	useEffect(() => {
		fillRefs.current.forEach((el, i) => {
			if (!el) return;
			if (i < index) el.style.width = "100%";
			else if (i > index) el.style.width = "0%";
			else el.style.width = `${elapsedRef.current / CYCLE_MS * 100}%`;
		});
		if (paused) return;
		const start = performance.now() - elapsedRef.current;
		let raf;
		const tick = (now) => {
			const elapsed = now - start;
			const p = Math.min(1, elapsed / CYCLE_MS);
			elapsedRef.current = elapsed;
			const el = fillRefs.current[index];
			if (el) el.style.width = `${p * 100}%`;
			if (p < 1) raf = requestAnimationFrame(tick);
			else {
				elapsedRef.current = 0;
				setIndex((i) => (i + 1) % DESTINATIONS$1.length);
			}
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [index, paused]);
	const active = DESTINATIONS$1[index];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "relative w-full min-h-[100svh] overflow-hidden bg-white",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0",
				children: [DESTINATIONS$1.map((d, i) => /* @__PURE__ */ jsxs("div", {
					className: "bg-layer " + (i === index ? "is-active" : ""),
					"aria-hidden": i !== index,
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white" }),
						d.photo && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
							src: d.photo.src,
							alt: "",
							className: "absolute inset-0 w-full h-full object-cover pointer-events-none " + (i === index ? "kenburns-layer" : ""),
							style: { objectPosition: d.photo.objectPos ?? "center" }
						}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/65 pointer-events-none" })] }),
						!d.photo && /* @__PURE__ */ jsx("div", {
							className: "absolute inset-x-0 bottom-0 h-[72%] flex items-end justify-center pointer-events-none",
							children: /* @__PURE__ */ jsx("div", {
								className: "w-full max-w-[1700px] " + (i === index ? "kenburns-layer" : ""),
								style: { filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.45))" },
								children: /* @__PURE__ */ jsx(Silhouette, {
									id: d.silhouette,
									className: "w-full h-auto"
								})
							})
						})
					]
				}, d.name)), /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 pt-32 pb-[280px] sm:pb-[260px]",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "reveal-mask",
						children: /* @__PURE__ */ jsxs("div", {
							className: "reveal-line reveal-1 flex items-center gap-3 text-[11.5px] tracking-[0.32em] uppercase text-white/70",
							children: [
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a8cce8] pulse-dot" }),
								/* @__PURE__ */ jsx("span", { children: t("hero.eyebrow") }),
								/* @__PURE__ */ jsx("span", {
									className: "hidden sm:inline crosshair text-white/40 normal-case tracking-[0.05em] ml-2",
									children: active.coords
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "mt-7 sm:mt-9 font-display text-white leading-[0.92] tracking-tight",
						children: [/* @__PURE__ */ jsx("div", {
							className: "reveal-mask block",
							children: /* @__PURE__ */ jsx("span", {
								className: "reveal-line reveal-2 text-[44px] sm:text-[68px] md:text-[84px] font-light text-white/95",
								children: "Where will you go"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "block mt-1 sm:mt-2 leading-[0.9]",
							children: [/* @__PURE__ */ jsx("span", {
								className: "reveal-mask",
								children: /* @__PURE__ */ jsx("span", {
									className: "reveal-line reveal-3 text-[64px] sm:text-[110px] md:text-[148px] font-semibold dest-glow",
									children: /* @__PURE__ */ jsx("span", {
										className: "word-swap inline-block",
										style: { color: active.accent },
										children: active.name
									}, active.name + index)
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "reveal-mask",
								children: /* @__PURE__ */ jsx("span", {
									className: "reveal-line reveal-3 text-[64px] sm:text-[110px] md:text-[148px] font-semibold text-white/95",
									children: "."
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-7 sm:mt-8 max-w-[560px]",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-[15.5px] sm:text-[17px] leading-relaxed text-white/75 font-light",
							style: {
								opacity: 0,
								animation: "fadeInBlurb 800ms cubic-bezier(.22,1,.36,1) forwards",
								animationDelay: "0.75s"
							},
							children: /* @__PURE__ */ jsx("span", {
								className: "swap-fade inline-block",
								children: active.blurb
							}, active.name + "blurb" + index)
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-7",
						style: {
							opacity: 0,
							animation: "fadeInBlurb 800ms cubic-bezier(.22,1,.36,1) forwards",
							animationDelay: "0.95s"
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "destinations",
								className: "group inline-flex items-center gap-3 text-[14px] text-white font-medium whitespace-nowrap",
								children: [t("hero.explore"), /* @__PURE__ */ jsx("span", {
									className: "w-9 h-9 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:text-[#0d1b38] transition",
									children: /* @__PURE__ */ jsx("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
									})
								})]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setPaused((p) => !p),
								className: "inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-white transition px-3 py-2 rounded-full liquid-pill whitespace-nowrap cursor-pointer",
								children: [/* @__PURE__ */ jsxs("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.8",
									children: [/* @__PURE__ */ jsx("circle", {
										cx: "12",
										cy: "12",
										r: "9"
									}), /* @__PURE__ */ jsx("path", {
										d: "M10 8.5l6 3.5-6 3.5z",
										fill: "currentColor"
									})]
								}), paused ? t("hero.resume") : t("hero.pause")]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute right-6 sm:right-8 top-32 hidden md:flex flex-col items-end gap-3 text-right",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "liquid-pill rounded-full pl-2 pr-4 py-1.5 inline-flex items-center gap-2 swap-fade",
							children: [/* @__PURE__ */ jsx("span", {
								className: "w-7 h-7 rounded-full bg-white/15 flex items-center justify-center",
								children: /* @__PURE__ */ jsx("svg", {
									width: "13",
									height: "13",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "text-white",
									children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 0 1 9.5 9 2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 14.5 9 2.5 2.5 0 0 1 12 11.5z" })
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "leading-tight whitespace-nowrap",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-[12px] font-medium text-white whitespace-nowrap",
									children: [
										active.name,
										", ",
										active.country
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-[9.5px] tracking-[0.2em] uppercase text-white/55 whitespace-nowrap",
									children: [
										active.code,
										" · ",
										active.region
									]
								})]
							})]
						}, "pill" + index), /* @__PURE__ */ jsx("div", {
							className: "swap-fade text-[10.5px] tracking-[0.2em] uppercase text-white/55 crosshair whitespace-nowrap",
							children: active.season
						}, "season" + index)]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute left-6 right-6 sm:left-8 sm:right-8 bottom-[230px] sm:bottom-[210px] flex items-center gap-4 text-white/65 text-[11px] tracking-[0.2em] uppercase",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "crosshair text-white/45",
								children: [
									String(index + 1).padStart(2, "0"),
									" / ",
									String(DESTINATIONS$1.length).padStart(2, "0")
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex-1 flex items-center gap-1",
								children: DESTINATIONS$1.map((d, i) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => jumpTo(i),
									className: "flex-1 progress-bar rounded-full overflow-hidden cursor-pointer",
									"aria-label": `Go to ${d.name}`,
									children: /* @__PURE__ */ jsx("div", {
										ref: (el) => {
											fillRefs.current[i] = el;
										},
										className: "progress-fill",
										style: { width: i < index ? "100%" : "0%" }
									})
								}, d.name))
							}),
							/* @__PURE__ */ jsx("span", {
								className: "crosshair text-white/45 hidden sm:inline",
								children: active.code
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block",
				children: /* @__PURE__ */ jsx("div", {
					className: "liquid-glass rounded-2xl p-2 w-[60px]",
					children: DESTINATIONS$1.map((d, i) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => jumpTo(i),
						title: d.name,
						className: "w-full aspect-square my-0.5 rounded-xl flex items-center justify-center text-[10px] font-medium transition cursor-pointer " + (i === index ? "text-white" : "text-white/60 hover:text-white"),
						style: i === index ? { background: "rgba(255,255,255,.12)" } : {},
						children: d.code
					}, d.name))
				})
			})
		]
	}), /* @__PURE__ */ jsx(JourneyStartCTA, {})] });
}
//#endregion
//#region src/components/SEOHead.tsx
var SITE_URL = "https://nextroutetravels.com";
var DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
function SEOHead({ title, description, canonicalPath = "/", ogImage = DEFAULT_IMAGE, jsonLd }) {
	const canonical = `${SITE_URL}${canonicalPath}`;
	return /* @__PURE__ */ jsxs(Helmet, { children: [
		/* @__PURE__ */ jsx("title", { children: title }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: description
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: canonical
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: "Next Route Travels"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: canonical
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: ogImage
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: ogImage
		}),
		jsonLd && /* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		})
	] });
}
//#endregion
//#region src/pages/HomePage.tsx
var JSON_LD = {
	"@context": "https://schema.org",
	"@type": "TravelAgency",
	name: "Next Route Travels",
	description: "From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions.",
	url: "https://nextroutetravels.com",
	logo: "https://nextroutetravels.com/fav.png",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Lagos",
		addressCountry: "NG"
	},
	areaServed: [
		"Nigeria",
		"Ghana",
		"West Africa",
		"Europe",
		"Americas",
		"Middle East"
	],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Travel Services",
		itemListElement: [
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "International Flights"
				}
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "West African Road Travel"
				}
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "Latin America Expeditions"
				}
			}
		]
	}
};
var SPRING$1 = {
	type: "spring",
	stiffness: 400,
	damping: 30
};
var fadeUp$3 = {
	initial: {
		opacity: 0,
		y: 40
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: false,
		margin: "200px 0px -60px 0px"
	},
	transition: {
		duration: .65,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
function Eyebrow$2({ label, dark = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
		style: {
			background: dark ? "rgba(74,144,217,0.12)" : "rgba(74,144,217,0.1)",
			border: "1px solid rgba(74,144,217,0.25)"
		},
		children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#4a90d9]" }), /* @__PURE__ */ jsx("span", {
			className: "text-[11px] font-black uppercase tracking-[0.22em] text-[#4a90d9]",
			style: { fontFamily: "Satoshi, sans-serif" },
			children: label
		})]
	});
}
function WaveBridge$1({ from, to }) {
	return /* @__PURE__ */ jsx("div", {
		style: {
			background: to,
			marginTop: -1,
			lineHeight: 0
		},
		children: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 1440 72",
			preserveAspectRatio: "none",
			style: {
				display: "block",
				width: "100%",
				height: 72
			},
			children: /* @__PURE__ */ jsx("path", {
				d: "M0,0 C360,72 1080,72 1440,0 L1440,0 L0,0 Z",
				fill: from
			})
		})
	});
}
function DestCard({ name, region, subtitleKey, bodyKey, image, delay = 0 }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(motion.div, {
		className: "group relative overflow-hidden rounded-3xl h-full",
		style: { boxShadow: "0 12px 48px -8px rgba(0,0,0,0.5)" },
		initial: {
			opacity: 0,
			y: 36
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: false,
			margin: "200px 0px -60px 0px"
		},
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		},
		whileHover: { y: -6 },
		children: /* @__PURE__ */ jsxs(Link, {
			to: "/destinations",
			className: "block h-full",
			style: { minHeight: 240 },
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: "absolute inset-0 bg-cover bg-center will-change-transform",
					style: { backgroundImage: `url(${image})` },
					whileHover: { scale: 1.07 },
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						]
					}
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(to top, rgba(13,27,56,0.96) 0%, rgba(13,27,56,0.45) 50%, transparent 80%)" }
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative h-full flex flex-col justify-end p-6 md:p-8",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-black uppercase tracking-[0.28em] text-white/50 mb-1",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: region
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-3xl font-black text-white leading-none mb-2",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[#a8cce8] text-xs font-semibold mb-2",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t(`home_destinations.${subtitleKey}`)
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-white/40 text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t(`home_destinations.${bodyKey}`)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5 text-[#a8cce8] text-sm font-semibold",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [t("home_destinations.read_guide"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" })]
						})
					]
				})
			]
		})
	});
}
function HomePage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Next Route Travels — We Plan the Route. You Enjoy the Journey.",
			description: "From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions.",
			canonicalPath: "/",
			jsonLd: JSON_LD
		}),
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "text-center mb-14",
					...fadeUp$3,
					children: [/* @__PURE__ */ jsx(Eyebrow$2, { label: t("home_services.eyebrow") }), /* @__PURE__ */ jsx("h2", {
						className: "text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-[#0d1b38]",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("home_services.heading")
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-4",
					children: [
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-7 rounded-[28px] relative overflow-hidden flex flex-col",
							style: {
								background: "#0d1b38",
								minHeight: 400
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							whileHover: { y: -6 },
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "absolute -top-4 right-4 text-[10rem] font-black text-white/[0.035] leading-none select-none pointer-events-none",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "01"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none",
									style: { background: "radial-gradient(circle, rgba(74,144,217,0.18) 0%, transparent 70%)" }
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative p-8 lg:p-10 flex flex-col flex-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-7",
												style: {
													background: "rgba(74,144,217,0.12)",
													border: "1px solid rgba(74,144,217,0.22)"
												},
												children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-[#4a90d9]" })
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "text-2xl lg:text-3xl font-black text-white leading-tight mb-3",
												style: { fontFamily: "Clash Display, sans-serif" },
												children: t("home_services.flights_title")
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-white/40 text-sm leading-relaxed max-w-sm",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t("home_services.flights_body")
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "mt-8",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2 mb-7",
											children: [
												"Lagos → London",
												"Lagos → Dubai",
												"Abuja → New York",
												"Lagos → Toronto"
											].map((r) => /* @__PURE__ */ jsx("span", {
												className: "text-[11px] font-semibold px-3 py-1.5 rounded-full text-[#a8cce8]",
												style: {
													background: "rgba(168,204,232,0.08)",
													border: "1px solid rgba(168,204,232,0.14)",
													fontFamily: "Satoshi, sans-serif"
												},
												children: r
											}, r))
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-5",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
													className: "text-3xl font-black text-white leading-none",
													style: { fontFamily: "Clash Display, sans-serif" },
													children: ["120", /* @__PURE__ */ jsx("span", {
														className: "text-[#4a90d9]",
														children: "+"
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "text-[10px] font-bold uppercase tracking-[0.22em] text-white/25 mt-1",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: "Routes"
												})] }),
												/* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-white/10" }),
												/* @__PURE__ */ jsxs(Link, {
													to: "/services",
													className: "flex items-center gap-2 text-[#a8cce8] text-sm font-semibold hover:text-white transition-colors",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: [t("home_services.learn_more"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
												})
											]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-5 rounded-[28px] bg-white overflow-hidden relative flex flex-col",
							style: {
								border: "1px solid rgba(13,27,56,0.08)",
								minHeight: 400
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .1
							},
							whileHover: { y: -6 },
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "absolute -top-4 right-4 text-[10rem] font-black text-[#0d1b38]/[0.04] leading-none select-none pointer-events-none",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "02"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]",
									style: { background: "linear-gradient(90deg, #4a90d9 0%, #a8cce8 100%)" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-[3px] left-0 right-0 h-20 rounded-b-[60%]",
									style: { background: "linear-gradient(180deg, rgba(74,144,217,0.05) 0%, transparent 100%)" }
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative p-8 flex flex-col flex-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-7",
												style: {
													background: "rgba(74,144,217,0.08)",
													border: "1px solid rgba(74,144,217,0.18)"
												},
												children: /* @__PURE__ */ jsx(Map, { className: "w-6 h-6 text-[#4a90d9]" })
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "text-2xl font-black text-[#0d1b38] leading-tight mb-3",
												style: { fontFamily: "Clash Display, sans-serif" },
												children: t("home_services.road_title")
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[#0d1b38]/45 text-sm leading-relaxed",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t("home_services.road_body")
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "mt-6",
										children: [[
											"Vetted vehicles & licensed drivers",
											"Real-time GPS tracking",
											"Lagos · Accra · Abuja + more"
										].map((f) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 py-3 border-b border-[#0d1b38]/[0.06] last:border-0",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-5 h-5 rounded-full shrink-0 flex items-center justify-center",
												style: { background: "rgba(74,144,217,0.1)" },
												children: /* @__PURE__ */ jsx("svg", {
													width: "8",
													height: "6",
													viewBox: "0 0 8 6",
													fill: "none",
													children: /* @__PURE__ */ jsx("path", {
														d: "M1 3l2 2 4-4",
														stroke: "#4a90d9",
														strokeWidth: "1.5",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												})
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[13px] font-semibold text-[#0d1b38]/65",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: f
											})]
										}, f)), /* @__PURE__ */ jsxs(Link, {
											to: "/services",
											className: "mt-5 inline-flex items-center gap-2 text-[#4a90d9] text-sm font-semibold hover:gap-3 transition-all duration-200",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: [t("home_services.learn_more"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-12 rounded-[28px] overflow-hidden relative",
							style: {
								background: "linear-gradient(135deg, #1a3560 0%, #0d1b38 100%)",
								minHeight: 180
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .2
							},
							whileHover: { y: -4 },
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "absolute top-1/2 -translate-y-1/2 right-8 text-[160px] font-black text-white/[0.03] leading-none select-none pointer-events-none",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "03"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none",
									style: { background: "radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)" }
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
											style: {
												background: "rgba(74,144,217,0.12)",
												border: "1px solid rgba(74,144,217,0.22)"
											},
											children: /* @__PURE__ */ jsx(Compass, { className: "w-6 h-6 text-[#4a90d9]" })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-2xl lg:text-3xl font-black text-white leading-tight mb-2",
												style: { fontFamily: "Clash Display, sans-serif" },
												children: t("home_services.latam_title")
											}), /* @__PURE__ */ jsx("p", {
												className: "text-white/40 text-sm leading-relaxed max-w-xl",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t("home_services.latam_body")
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-5 shrink-0",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
													className: "text-3xl font-black text-white leading-none",
													style: { fontFamily: "Clash Display, sans-serif" },
													children: ["8", /* @__PURE__ */ jsx("span", {
														className: "text-[#4a90d9]",
														children: "+"
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mt-1",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: "Countries"
												})] }),
												/* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-white/10" }),
												/* @__PURE__ */ jsx(Link, {
													to: "/services",
													children: /* @__PURE__ */ jsxs(motion.div, {
														className: "inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-white",
														whileHover: {
															scale: 1.02,
															y: -1
														},
														whileTap: { scale: .97 },
														transition: SPRING$1,
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-[13px] font-bold text-[#0d1b38]",
															style: { fontFamily: "Satoshi, sans-serif" },
															children: t("home_services.learn_more")
														}), /* @__PURE__ */ jsx("span", {
															className: "w-8 h-8 rounded-full bg-[#0d1b38] flex items-center justify-center",
															children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-white" })
														})]
													})
												})
											]
										})
									]
								})
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(WaveBridge$1, {
			from: "#f5f8fc",
			to: "#0d1b38"
		}),
		/* @__PURE__ */ jsx(LocationsGlobe, {}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute top-10 left-0 right-0 flex justify-center pointer-events-none overflow-hidden",
				"aria-hidden": true,
				children: /* @__PURE__ */ jsx("span", {
					className: "text-[clamp(80px,12vw,160px)] font-black text-white/[0.025] uppercase whitespace-nowrap select-none tracking-widest",
					style: { fontFamily: "Clash Display, sans-serif" },
					children: "DESTINATIONS"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto relative",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "text-center mb-14",
						...fadeUp$3,
						children: [
							/* @__PURE__ */ jsx(Eyebrow$2, {
								label: "Destination Guides",
								dark: true
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("home_destinations.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-white/40 text-base max-w-xl mx-auto",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("home_destinations.sub")
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-4",
						style: { minHeight: 560 },
						children: [/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-7 min-h-[360px] lg:min-h-0",
							children: /* @__PURE__ */ jsx(DestCard, {
								name: "Rome",
								region: "Italy, Europe",
								subtitleKey: "rome_subtitle",
								bodyKey: "rome_body",
								image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&auto=format&fit=crop&q=85"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-5 grid grid-rows-2 gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "min-h-[220px]",
								children: /* @__PURE__ */ jsx(DestCard, {
									name: "Serengeti",
									region: "Tanzania, Africa",
									subtitleKey: "serengeti_subtitle",
									bodyKey: "serengeti_body",
									image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&auto=format&fit=crop&q=85",
									delay: .1
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "min-h-[220px]",
								children: /* @__PURE__ */ jsx(DestCard, {
									name: "Greek Islands",
									region: "Greece, Europe",
									subtitleKey: "greek_subtitle",
									bodyKey: "greek_body",
									image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&auto=format&fit=crop&q=85",
									delay: .18
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "text-center mt-10",
						...fadeUp$3,
						transition: {
							duration: .5,
							delay: .28
						},
						children: /* @__PURE__ */ jsx(Link, {
							to: "/destinations",
							children: /* @__PURE__ */ jsxs(motion.div, {
								className: "inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full",
								style: {
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.12)"
								},
								whileHover: {
									background: "rgba(255,255,255,0.10)",
									borderColor: "rgba(255,255,255,0.22)"
								},
								transition: { duration: .2 },
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-white",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_destinations.view_all")
								}), /* @__PURE__ */ jsx("span", {
									className: "w-8 h-8 rounded-full bg-white flex items-center justify-center",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-[#0d1b38]" })
								})]
							})
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(WaveBridge$1, {
			from: "#0d1b38",
			to: "#f5f8fc"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "lg:col-span-5",
					...fadeUp$3,
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-[28px] overflow-hidden",
						style: { background: "#0d1b38" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-8 lg:p-10 relative overflow-hidden",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none",
									style: { background: "radial-gradient(circle, rgba(74,144,217,0.15) 0%, transparent 70%)" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-[100px] leading-[0.8] text-[#4a90d9]/20 font-black select-none -mb-4",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "\""
								}),
								/* @__PURE__ */ jsx("blockquote", {
									className: "text-xl lg:text-2xl font-black leading-snug text-white mb-5",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("our_story_page.mission_quote")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/30 text-sm",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "— Next Route Travels"
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-3 divide-x",
							style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
							children: [
								{
									val: "12+",
									label: "Years"
								},
								{
									val: "50+",
									label: "Countries"
								},
								{
									val: "4.9★",
									label: "Rating"
								}
							].map(({ val, label }) => /* @__PURE__ */ jsxs("div", {
								className: "py-6 text-center",
								style: { borderRight: "1px solid rgba(255,255,255,0.08)" },
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xl font-black text-white leading-none",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: val
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1.5",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: label
								})]
							}, label))
						})]
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
					className: "lg:col-span-7 lg:pl-8 pt-1",
					...fadeUp$3,
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						],
						delay: .15
					},
					children: [
						/* @__PURE__ */ jsx(Eyebrow$2, { label: t("home_about.eyebrow") }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl lg:text-[2.9rem] font-black tracking-tight leading-[0.95] text-[#0d1b38] mb-6",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("home_about.heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 mb-8",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[#0d1b38]/55 text-[15px] leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("home_about.body1")
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[#0d1b38]/55 text-[15px] leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("home_about.body2")
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-3 gap-4 mb-8",
							children: [
								{
									label: "Integrity",
									icon: "🤝"
								},
								{
									label: "Discovery",
									icon: "🌍"
								},
								{
									label: "Excellence",
									icon: "✦"
								}
							].map(({ label, icon }) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl p-4 text-center",
								style: {
									background: "rgba(74,144,217,0.07)",
									border: "1px solid rgba(74,144,217,0.15)"
								},
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xl mb-1",
									children: icon
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[12px] font-bold text-[#0d1b38]/70 uppercase tracking-[0.15em]",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: label
								})]
							}, label))
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/our-story",
							children: /* @__PURE__ */ jsxs(motion.div, {
								className: "inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-[#0d1b38]",
								whileHover: {
									scale: 1.02,
									y: -1
								},
								whileTap: { scale: .97 },
								transition: SPRING$1,
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[13px] font-bold text-white",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_about.cta")
								}), /* @__PURE__ */ jsx("span", {
									className: "w-8 h-8 rounded-full bg-[#4a90d9] flex items-center justify-center",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-white" })
								})]
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(WaveBridge$1, {
			from: "#f5f8fc",
			to: "#0d1b38"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "text-center mb-14",
					...fadeUp$3,
					children: [/* @__PURE__ */ jsx(Eyebrow$2, {
						label: "Why Choose Us",
						dark: true
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("home_features.heading")
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-4",
					children: [
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-7 rounded-[28px] relative overflow-hidden p-8 lg:p-10",
							style: {
								background: "rgba(255,255,255,0.04)",
								border: "1px solid rgba(255,255,255,0.08)",
								minHeight: 320
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							whileHover: {
								borderColor: "rgba(74,144,217,0.3)",
								background: "rgba(74,144,217,0.05)"
							},
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none",
									style: { background: "radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 70%)" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
									style: {
										background: "rgba(74,144,217,0.12)",
										border: "1px solid rgba(74,144,217,0.22)"
									},
									children: /* @__PURE__ */ jsx(Navigation, { className: "w-6 h-6 text-[#4a90d9]" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl lg:text-2xl font-black text-white mb-3",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("home_features.nav_title")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/40 text-sm leading-relaxed max-w-sm",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_features.nav_body")
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-8 flex items-end gap-3",
									children: [
										"Lagos",
										"London",
										"Dubai",
										"New York"
									].map((city, i, arr) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-2.5 h-2.5 rounded-full bg-[#4a90d9]",
												style: { boxShadow: "0 0 8px rgba(74,144,217,0.6)" }
											}), /* @__PURE__ */ jsx("p", {
												className: "text-[10px] font-bold text-white/30 uppercase tracking-wide",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: city
											})]
										}), i < arr.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-8 sm:w-12 h-px bg-[#4a90d9]/25 mb-4 shrink-0" })]
									}, city))
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-5 rounded-[28px] bg-white overflow-hidden relative p-8",
							style: {
								border: "1px solid rgba(13,27,56,0.08)",
								minHeight: 320
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .1
							},
							whileHover: { y: -6 },
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]",
									style: { background: "linear-gradient(90deg, #4a90d9 0%, #a8cce8 100%)" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
									style: {
										background: "rgba(74,144,217,0.08)",
										border: "1px solid rgba(74,144,217,0.18)"
									},
									children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-[#4a90d9]" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl font-black text-[#0d1b38] mb-3",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("home_features.regional_title")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[#0d1b38]/45 text-sm leading-relaxed",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_features.regional_body")
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 flex flex-wrap gap-2",
									children: [
										"West Africa",
										"Europe",
										"Americas",
										"Middle East"
									].map((r) => /* @__PURE__ */ jsx("span", {
										className: "text-[11px] font-semibold px-3 py-1.5 rounded-full text-[#4a90d9]",
										style: {
											background: "rgba(74,144,217,0.08)",
											border: "1px solid rgba(74,144,217,0.18)",
											fontFamily: "Satoshi, sans-serif"
										},
										children: r
									}, r))
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-5 rounded-[28px] overflow-hidden relative p-8",
							style: {
								background: "rgba(255,255,255,0.04)",
								border: "1px solid rgba(255,255,255,0.08)",
								minHeight: 260
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .15
							},
							whileHover: {
								borderColor: "rgba(74,144,217,0.28)",
								background: "rgba(74,144,217,0.05)"
							},
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
									style: {
										background: "rgba(74,144,217,0.12)",
										border: "1px solid rgba(74,144,217,0.22)"
									},
									children: /* @__PURE__ */ jsx(Compass, { className: "w-6 h-6 text-[#4a90d9]" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl font-black text-white mb-3",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("home_features.adventure_title")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/40 text-sm leading-relaxed",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_features.adventure_body")
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 flex flex-col gap-2",
									children: [
										"Colombia → Ecuador",
										"Patagonia Circuit",
										"Peru Sacred Valley"
									].map((e) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 text-[12px] font-semibold text-white/50",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: [/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a90d9]/60 shrink-0" }), e]
									}, e))
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "lg:col-span-7 rounded-[28px] overflow-hidden relative p-8 lg:p-10",
							style: {
								background: "rgba(255,255,255,0.04)",
								border: "1px solid rgba(255,255,255,0.08)",
								minHeight: 260
							},
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -60px 0px"
							},
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .2
							},
							whileHover: {
								borderColor: "rgba(74,144,217,0.28)",
								background: "rgba(74,144,217,0.05)"
							},
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-4 right-8 text-[80px] leading-none text-white/[0.04] font-black select-none pointer-events-none",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "\""
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
									style: {
										background: "rgba(74,144,217,0.12)",
										border: "1px solid rgba(74,144,217,0.22)"
									},
									children: /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-[#4a90d9]" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl lg:text-2xl font-black text-white mb-3",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("home_features.cultural_title")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/40 text-sm leading-relaxed max-w-lg",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("home_features.cultural_body")
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-7 pl-4",
									style: { borderLeft: "2px solid rgba(74,144,217,0.35)" },
									children: /* @__PURE__ */ jsx("p", {
										className: "text-sm font-semibold text-white/40 italic leading-relaxed",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: "\"Every journey is a story waiting to be written.\""
									})
								})
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
}
//#endregion
//#region src/pages/ServicesPage.tsx
var IMG_HERO = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&auto=format&fit=crop&q=90";
var IMG_FLIGHTS = "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&auto=format&fit=crop&q=85";
var IMG_ROAD = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=85";
var IMG_LATAM = "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&auto=format&fit=crop&q=85";
var FLIGHT_ROUTES = [
	"Lagos → London",
	"Lagos → Dubai",
	"Abuja → New York",
	"Lagos → Toronto",
	"Abuja → Atlanta"
];
var ROAD_ROUTES = [
	"Lagos → Abuja",
	"Lagos → Accra",
	"Abuja → Kano",
	"Lagos → Cotonou",
	"Port Harcourt → Enugu"
];
var ROAD_FEATURES = [
	{
		Icon: Shield,
		title: "Vetted vehicles",
		body: "Every vehicle inspected before departure."
	},
	{
		Icon: Users,
		title: "Experienced drivers",
		body: "Licensed, route-familiar professionals."
	},
	{
		Icon: Clock,
		title: "Real-time tracking",
		body: "Live location shared with your contacts."
	},
	{
		Icon: Star,
		title: "4.9-star rated",
		body: "Consistently top-rated by our travellers."
	}
];
var EXPEDITIONS = [
	{
		title: "Colombia → Ecuador Overland",
		duration: "14 days",
		desc: "Cross the Andes from Medellín to Quito, passing cloud forests, volcano corridors, and colonial towns.",
		includes: "SUV · Guide · Accommodation · Meals",
		image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=700&auto=format&fit=crop&q=80",
		accent: "#34d399"
	},
	{
		title: "Patagonia SUV Circuit",
		duration: "10 days",
		desc: "Drive the legendary Ruta 40, camp under the stars, and trek Torres del Paine.",
		includes: "SUV · Guide · Camping gear · Permits",
		image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&auto=format&fit=crop&q=80",
		accent: "#60a5fa"
	},
	{
		title: "Peru Sacred Valley & Amazon",
		duration: "12 days",
		desc: "Machu Picchu by road, then descend into the Amazon for a once-in-a-lifetime contrast.",
		includes: "4x4 · Bilingual guide · Cusco flights",
		image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=700&auto=format&fit=crop&q=80",
		accent: "#fbbf24"
	},
	{
		title: "Mexico City → Panama",
		duration: "21 days",
		desc: "Six countries, ancient ruins, and Pacific coastlines. The ultimate Central American road epic.",
		includes: "Convoy SUV · Support team · Hotels · Ferry",
		image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?w=700&auto=format&fit=crop&q=80",
		accent: "#f87171"
	}
];
var HERO_SERVICES = [
	{
		Icon: Plane,
		label: "International Flights",
		sub: "120+ routes from Lagos & Abuja"
	},
	{
		Icon: MapPin,
		label: "West Africa Road Travel",
		sub: "Vetted fleets, real-time tracking"
	},
	{
		Icon: Compass,
		label: "Latin America Expeditions",
		sub: "Overland adventures, 4x4 ready"
	}
];
var fadeUp$2 = {
	initial: {
		opacity: 0,
		y: 40
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: false,
		margin: "200px 0px -60px 0px"
	},
	transition: {
		duration: .7,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
function RoutePill({ label }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold",
		style: {
			fontFamily: "Satoshi, sans-serif",
			background: "rgba(74,144,217,0.1)",
			color: "#4a90d9",
			border: "1px solid rgba(74,144,217,0.22)"
		},
		children: [/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-current opacity-60" }), label]
	});
}
function SectionEyebrow({ label, dark = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
		style: {
			background: dark ? "rgba(255,255,255,0.08)" : "rgba(74,144,217,0.1)",
			border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(74,144,217,0.25)"
		},
		children: [/* @__PURE__ */ jsx("span", {
			className: "w-1.5 h-1.5 rounded-full",
			style: { background: dark ? "#60a5fa" : "#4a90d9" }
		}), /* @__PURE__ */ jsx("span", {
			className: "text-[11px] font-black uppercase tracking-[0.2em]",
			style: {
				fontFamily: "Satoshi, sans-serif",
				color: dark ? "rgba(255,255,255,0.6)" : "#4a90d9"
			},
			children: label
		})]
	});
}
function EnquireButton({ dark = false, label }) {
	return /* @__PURE__ */ jsx(Link, {
		to: "/enquiries",
		children: /* @__PURE__ */ jsxs(motion.span, {
			className: "inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full cursor-pointer",
			style: {
				background: dark ? "#fff" : "#0d1b38",
				color: dark ? "#0d1b38" : "#fff",
				fontFamily: "Satoshi, sans-serif"
			},
			whileHover: { scale: 1.03 },
			whileTap: { scale: .97 },
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 32
			},
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm font-bold",
				children: label
			}), /* @__PURE__ */ jsx("span", {
				className: "w-9 h-9 rounded-full flex items-center justify-center",
				style: { background: dark ? "#0d1b38" : "rgba(255,255,255,0.15)" },
				children: /* @__PURE__ */ jsx(ArrowRight, {
					className: "w-4 h-4",
					style: { color: dark ? "#fff" : "#fff" }
				})
			})]
		})
	});
}
function ServicesPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-[#f5f8fc]",
		children: [
			/* @__PURE__ */ jsx(SEOHead, {
				title: "Travel Services — Next Route Travels",
				description: "From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure.",
				canonicalPath: "/services"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative min-h-[92vh] flex flex-col justify-end overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0",
					children: [/* @__PURE__ */ jsx("img", {
						src: IMG_HERO,
						alt: "Airplane wing above clouds",
						className: "w-full h-full object-cover",
						style: { objectPosition: "center 60%" }
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(to bottom, rgba(13,27,56,0.55) 0%, rgba(13,27,56,0.3) 35%, rgba(13,27,56,0.72) 70%, #0d1b38 100%)" }
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 max-w-7xl mx-auto w-full px-6 pt-40 pb-0",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 32
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .85,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 mb-6 backdrop-blur-sm",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("services_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.93] mb-6",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("services_page.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-lg text-white/50 max-w-xl leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("services_page.sub")
							})
						]
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .75,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: .22
						},
						className: "mt-16 grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-t-2xl",
						style: { background: "rgba(255,255,255,0.06)" },
						children: HERO_SERVICES.map(({ Icon, label, sub }, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 px-6 py-5 backdrop-blur-md transition-colors duration-300 hover:bg-white/10 cursor-default",
							style: {
								background: "rgba(13,27,56,0.55)",
								borderTop: "1px solid rgba(255,255,255,0.1)"
							},
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
									style: {
										background: "rgba(74,144,217,0.2)",
										border: "1px solid rgba(74,144,217,0.3)"
									},
									children: /* @__PURE__ */ jsx(Icon, {
										className: "w-4.5 h-4.5",
										style: { color: "#60a5fa" }
									})
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-black text-white leading-tight",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: label
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-white/40 mt-0.5",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: sub
								})] }),
								i < HERO_SERVICES.length - 1 && /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto w-4 h-4 text-white/20 hidden md:block" })
							]
						}, label))
					})]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-28 px-6 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$2,
						className: "relative",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative rounded-3xl overflow-hidden aspect-[4/3]",
								style: { boxShadow: "0 24px 80px -16px rgba(13,27,56,0.2)" },
								children: [/* @__PURE__ */ jsx("img", {
									src: IMG_FLIGHTS,
									alt: "Aircraft at dusk",
									className: "w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								}), /* @__PURE__ */ jsx("div", {
									className: "absolute inset-0",
									style: { background: "linear-gradient(to top, rgba(13,27,56,0.6) 0%, transparent 55%)" }
								})]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								className: "absolute -bottom-5 -right-5 md:right-6 rounded-2xl p-4 min-w-[170px]",
								style: {
									background: "#0d1b38",
									border: "1px solid rgba(168,204,232,0.15)",
									boxShadow: "0 16px 48px -8px rgba(13,27,56,0.5)"
								},
								initial: {
									opacity: 0,
									y: 16,
									scale: .95
								},
								whileInView: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								viewport: { once: false },
								transition: {
									duration: .6,
									ease: [
										.22,
										1,
										.36,
										1
									],
									delay: .25
								},
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-7 h-7 rounded-lg flex items-center justify-center",
											style: { background: "rgba(74,144,217,0.2)" },
											children: /* @__PURE__ */ jsx(Plane, { className: "w-3.5 h-3.5 text-blue-400" })
										}), /* @__PURE__ */ jsx("span", {
											className: "text-white/50 text-[10px] font-bold uppercase tracking-[0.15em]",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: "Routes"
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-3xl font-black text-white leading-none",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: "120+"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-white/35 text-xs mt-1",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: "International destinations"
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute -top-4 -left-4 w-20 h-20 rounded-full pointer-events-none",
								style: {
									border: "1px solid rgba(74,144,217,0.2)",
									background: "rgba(74,144,217,0.04)"
								}
							})
						]
					}), /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$2,
						transition: {
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: .1
						},
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsx(SectionEyebrow, { label: t("services_page.flights_eyebrow") }),
							/* @__PURE__ */ jsx("h2", {
								className: "text-4xl md:text-5xl font-black tracking-tight leading-[0.95]",
								style: {
									fontFamily: "Clash Display, sans-serif",
									color: "#0d1b38"
								},
								children: t("services_page.flights_heading")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4 leading-[1.8]",
								style: {
									fontFamily: "Satoshi, sans-serif",
									color: "rgba(13,27,56,0.52)",
									fontSize: "1.0625rem"
								},
								children: [/* @__PURE__ */ jsx("p", { children: t("services_page.flights_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.flights_body2") })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] mb-3",
								style: {
									fontFamily: "Satoshi, sans-serif",
									color: "rgba(13,27,56,0.3)"
								},
								children: t("services_page.popular_routes")
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: FLIGHT_ROUTES.map((r) => /* @__PURE__ */ jsx(RoutePill, { label: r }, r))
							})] }),
							/* @__PURE__ */ jsx(EnquireButton, { label: t("services_page.enquire_trip") })
						]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "py-28 px-6 bg-[#0d1b38] relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2",
					style: {
						background: "rgba(74,144,217,0.07)",
						filter: "blur(100px)"
					}
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$2,
						className: "space-y-6 order-2 lg:order-1",
						children: [
							/* @__PURE__ */ jsx(SectionEyebrow, {
								label: t("services_page.road_eyebrow"),
								dark: true
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("services_page.road_heading")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4 leading-[1.8]",
								style: {
									fontFamily: "Satoshi, sans-serif",
									color: "rgba(255,255,255,0.48)",
									fontSize: "1.0625rem"
								},
								children: [/* @__PURE__ */ jsx("p", { children: t("services_page.road_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.road_body2") })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: ROAD_ROUTES.map((r) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold",
									style: {
										fontFamily: "Satoshi, sans-serif",
										background: "rgba(255,255,255,0.07)",
										color: "rgba(255,255,255,0.6)",
										border: "1px solid rgba(255,255,255,0.1)"
									},
									children: [/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-blue-400" }), r]
								}, r))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
								children: ROAD_FEATURES.map(({ Icon, title, body }, i) => /* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: {
										once: false,
										margin: "200px 0px -30px 0px"
									},
									transition: {
										duration: .55,
										ease: [
											.22,
											1,
											.36,
											1
										],
										delay: i * .07
									},
									className: "flex items-start gap-3 p-4 rounded-2xl",
									style: {
										background: "rgba(255,255,255,0.04)",
										border: "1px solid rgba(255,255,255,0.07)"
									},
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
										style: { background: "rgba(74,144,217,0.15)" },
										children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 text-blue-400" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-black text-white leading-tight",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: title
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[12px] text-white/35 mt-0.5 leading-snug",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: body
									})] })]
								}, title))
							}),
							/* @__PURE__ */ jsx(EnquireButton, {
								dark: true,
								label: t("services_page.enquire_trip")
							})
						]
					}), /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$2,
						transition: {
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: .12
						},
						className: "relative order-1 lg:order-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative rounded-3xl overflow-hidden aspect-[4/3]",
							style: { boxShadow: "0 24px 80px -16px rgba(0,0,0,0.5)" },
							children: [
								/* @__PURE__ */ jsx("img", {
									src: IMG_ROAD,
									alt: "Open road through mountains",
									className: "w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0",
									style: { background: "linear-gradient(to top, rgba(13,27,56,0.5) 0%, transparent 55%)" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute bottom-5 left-5 right-5",
									children: /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-2 px-4 py-2 rounded-full",
										style: {
											background: "rgba(13,27,56,0.75)",
											backdropFilter: "blur(12px)",
											border: "1px solid rgba(255,255,255,0.12)"
										},
										children: [/* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-blue-400" }), /* @__PURE__ */ jsx("span", {
											className: "text-white text-xs font-bold",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: "West Africa · 5 countries covered"
										})]
									})
								})
							]
						}), /* @__PURE__ */ jsxs(motion.div, {
							className: "absolute -top-5 -right-4 md:right-6 rounded-2xl p-4",
							style: {
								background: "rgba(52,211,153,0.12)",
								border: "1px solid rgba(52,211,153,0.25)",
								backdropFilter: "blur(12px)"
							},
							initial: {
								opacity: 0,
								y: -12,
								scale: .95
							},
							whileInView: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							viewport: { once: false },
							transition: {
								duration: .6,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .3
							},
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-emerald-300 text-xs font-bold",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "4.9★ driver rating"
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-white/40 text-[11px] mt-1",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Verified by 1,200+ clients"
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-28 px-6 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center mb-20",
						children: [/* @__PURE__ */ jsxs(motion.div, {
							...fadeUp$2,
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsx(SectionEyebrow, { label: t("services_page.latam_eyebrow") }),
								/* @__PURE__ */ jsx("h2", {
									className: "text-4xl md:text-5xl font-black tracking-tight leading-[0.95]",
									style: {
										fontFamily: "Clash Display, sans-serif",
										color: "#0d1b38"
									},
									children: t("services_page.latam_heading")
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-4 leading-[1.8]",
									style: {
										fontFamily: "Satoshi, sans-serif",
										color: "rgba(13,27,56,0.52)",
										fontSize: "1.0625rem"
									},
									children: [/* @__PURE__ */ jsx("p", { children: t("services_page.latam_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.latam_body2") })]
								}),
								/* @__PURE__ */ jsx(EnquireButton, { label: t("services_page.enquire_trip") })
							]
						}), /* @__PURE__ */ jsx(motion.div, {
							...fadeUp$2,
							transition: {
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: .12
							},
							className: "relative",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative rounded-3xl overflow-hidden aspect-[4/3]",
								style: { boxShadow: "0 24px 80px -16px rgba(13,27,56,0.18)" },
								children: [
									/* @__PURE__ */ jsx("img", {
										src: IMG_LATAM,
										alt: "Patagonia expedition landscape",
										className: "w-full h-full object-cover transition-transform duration-700 hover:scale-105"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0",
										style: { background: "linear-gradient(to top, rgba(13,27,56,0.55) 0%, transparent 55%)" }
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute bottom-5 left-5",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 px-4 py-2 rounded-full",
											style: {
												background: "rgba(13,27,56,0.7)",
												backdropFilter: "blur(12px)",
												border: "1px solid rgba(255,255,255,0.12)"
											},
											children: [/* @__PURE__ */ jsx(Compass, { className: "w-3.5 h-3.5 text-blue-400" }), /* @__PURE__ */ jsx("span", {
												className: "text-white text-xs font-bold",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: "4 signature expeditions"
											})]
										})
									})
								]
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-5",
						children: EXPEDITIONS.map((exp, i) => /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 32
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: false,
								margin: "200px 0px -40px 0px"
							},
							transition: {
								duration: .6,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: i * .08
							},
							className: "group relative rounded-3xl overflow-hidden",
							style: {
								border: "1px solid rgba(13,27,56,0.07)",
								boxShadow: "0 4px 24px -6px rgba(13,27,56,0.08)"
							},
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-44 overflow-hidden",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: exp.image,
										alt: exp.title,
										className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-107",
										style: { objectPosition: "center 40%" }
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0",
										style: { background: "linear-gradient(to bottom, transparent 30%, rgba(13,27,56,0.75) 100%)" }
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-4 right-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "px-3 py-1.5 rounded-full text-xs font-black",
											style: {
												fontFamily: "Satoshi, sans-serif",
												background: exp.accent,
												color: "#0d1b38"
											},
											children: exp.duration
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute bottom-0 left-0 right-0 p-4",
										children: /* @__PURE__ */ jsx("h3", {
											className: "text-lg font-black text-white leading-tight",
											style: { fontFamily: "Clash Display, sans-serif" },
											children: exp.title
										})
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-5 bg-white",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-sm leading-relaxed mb-4",
										style: {
											fontFamily: "Satoshi, sans-serif",
											color: "rgba(13,27,56,0.55)"
										},
										children: exp.desc
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-1.5",
										children: exp.includes.split(" · ").map((item) => /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold",
											style: {
												fontFamily: "Satoshi, sans-serif",
												background: `${exp.accent}12`,
												color: exp.accent,
												border: `1px solid ${exp.accent}22`
											},
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }), item]
										}, item))
									}),
									/* @__PURE__ */ jsxs(Link, {
										to: "/enquiries",
										className: "inline-flex items-center gap-1.5 mt-5 text-sm font-bold transition-colors duration-200",
										style: {
											fontFamily: "Satoshi, sans-serif",
											color: exp.accent
										},
										children: ["Enquire about this expedition", /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })]
									})
								]
							})]
						}, exp.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx(CTABanner, {})
		]
	});
}
//#endregion
//#region src/components/ui/card-21.tsx
var DestinationCard = React.forwardRef(({ className, imageUrl, location, flag, stats, href, themeColor, ...props }, ref) => {
	return /* @__PURE__ */ jsx(motion.div, {
		ref,
		style: { "--theme-color": themeColor },
		className: cn("group w-full h-full", className),
		whileHover: {
			scale: 1.025,
			y: -4
		},
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 18
		},
		...props,
		children: /* @__PURE__ */ jsxs(Link, {
			to: href,
			className: "relative block w-full h-full rounded-2xl overflow-hidden",
			"aria-label": `Explore ${location}`,
			style: { boxShadow: `0 4px 28px -8px hsl(var(--theme-color) / 0.35)` },
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: "absolute inset-0 bg-cover bg-center will-change-transform",
					style: { backgroundImage: `url(${imageUrl})` },
					whileHover: { scale: 1.1 },
					transition: {
						type: "spring",
						stiffness: 200,
						damping: 20
					}
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "absolute inset-0 pointer-events-none",
					initial: { opacity: 0 },
					whileHover: { opacity: 1 },
					transition: {
						duration: .4,
						ease: "easeOut"
					},
					style: { boxShadow: `inset 0 0 60px hsl(var(--theme-color) / 0.3)` }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95) 0%, hsl(var(--theme-color) / 0.58) 38%, transparent 68%)` }
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative flex flex-col justify-end h-full p-6 text-white",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							y: 4,
							opacity: .85
						},
						whileHover: {
							y: 0,
							opacity: 1
						},
						transition: {
							type: "spring",
							stiffness: 320,
							damping: 22
						},
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "font-black tracking-tight leading-none",
							style: {
								fontFamily: "Clash Display, sans-serif",
								fontSize: "clamp(24px, 3vw, 32px)"
							},
							children: [
								location,
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-2xl ml-1",
									children: flag
								})
							]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-white/70 mt-1.5 font-medium",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: stats
						})]
					}), /* @__PURE__ */ jsxs(motion.div, {
						className: "mt-5 flex items-center justify-between backdrop-blur-md rounded-xl px-4 py-3",
						initial: { background: `hsl(var(--theme-color) / 0.22)` },
						whileHover: { background: `hsl(var(--theme-color) / 0.38)` },
						transition: { duration: .25 },
						style: { border: `1px solid hsl(var(--theme-color) / 0.35)` },
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm font-semibold tracking-wide",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: "Explore Now"
						}), /* @__PURE__ */ jsx(motion.div, {
							className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
							style: {
								border: "1.5px solid rgba(255,255,255,0.45)",
								background: "rgba(255,255,255,0.1)"
							},
							whileHover: {
								background: "rgba(255,255,255,0.22)",
								borderColor: "rgba(255,255,255,0.7)"
							},
							transition: { duration: .2 },
							children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
						})]
					})]
				})
			]
		})
	});
});
DestinationCard.displayName = "DestinationCard";
//#endregion
//#region src/pages/DestinationsPage.tsx
var DESTINATIONS = [
	{
		slug: "rome",
		name: "Rome",
		country: "Italy",
		region: "Europe",
		tags: [
			"Culture",
			"History",
			"Food"
		],
		flag: "🇮🇹",
		stats: "340+ Hotels · 18 Packages",
		imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1400&auto=format&fit=crop&q=85",
		themeColor: "0 60% 30%",
		lat: 41.9028,
		lng: 12.4964
	},
	{
		slug: "serengeti",
		name: "Serengeti",
		country: "Tanzania",
		region: "Africa",
		tags: [
			"Wildlife",
			"Adventure",
			"Nature"
		],
		flag: "🇹🇿",
		stats: "85 Lodges · 12 Safaris",
		imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&auto=format&fit=crop&q=85",
		themeColor: "35 70% 30%",
		lat: -4.9,
		lng: 34.8
	},
	{
		slug: "greek-islands",
		name: "Greek Islands",
		country: "Greece",
		region: "Europe",
		tags: [
			"Romance",
			"Beach",
			"Culture"
		],
		flag: "🇬🇷",
		stats: "210+ Villas · 24 Packages",
		imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&auto=format&fit=crop&q=85",
		themeColor: "200 70% 28%",
		lat: 37,
		lng: 25
	},
	{
		slug: "dubai",
		name: "Dubai",
		country: "UAE",
		region: "Middle East",
		tags: [
			"Luxury",
			"Architecture",
			"Shopping"
		],
		flag: "🇦🇪",
		stats: "520+ Hotels · 32 Packages",
		imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&auto=format&fit=crop&q=85",
		themeColor: "38 55% 28%",
		lat: 25.2048,
		lng: 55.2708
	},
	{
		slug: "london",
		name: "London",
		country: "United Kingdom",
		region: "Europe",
		tags: [
			"Urban",
			"Culture",
			"History"
		],
		flag: "🇬🇧",
		stats: "890+ Hotels · 28 Packages",
		imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&auto=format&fit=crop&q=85",
		themeColor: "215 55% 20%",
		lat: 51.5074,
		lng: -.1276
	},
	{
		slug: "new-york",
		name: "New York",
		country: "United States",
		region: "Americas",
		tags: [
			"Urban",
			"Culture",
			"Food"
		],
		flag: "🇺🇸",
		stats: "740+ Hotels · 22 Packages",
		imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&auto=format&fit=crop&q=85",
		themeColor: "240 50% 22%",
		lat: 40.7128,
		lng: -74.006
	},
	{
		slug: "cartagena",
		name: "Cartagena",
		country: "Colombia",
		region: "Americas",
		tags: [
			"History",
			"Beach",
			"Culture"
		],
		flag: "🇨🇴",
		stats: "120+ Hotels · 15 Packages",
		imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&auto=format&fit=crop&q=85",
		themeColor: "270 60% 28%",
		lat: 10.391,
		lng: -75.4794
	},
	{
		slug: "buenos-aires",
		name: "Buenos Aires",
		country: "Argentina",
		region: "Americas",
		tags: [
			"Food",
			"Dance",
			"Architecture"
		],
		flag: "🇦🇷",
		stats: "180+ Hotels · 16 Packages",
		imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1400&auto=format&fit=crop&q=85",
		themeColor: "168 60% 22%",
		lat: -34.6037,
		lng: -58.3816
	}
];
var REGION_KEYS = [
	{
		value: "All",
		key: "filter_all"
	},
	{
		value: "Africa",
		key: "filter_africa"
	},
	{
		value: "Europe",
		key: "filter_europe"
	},
	{
		value: "Middle East",
		key: "filter_middle_east"
	},
	{
		value: "Americas",
		key: "filter_americas"
	}
];
var KEYWORD_TAGS = [
	"Wildlife",
	"Beach",
	"Luxury",
	"History",
	"Culture",
	"Food",
	"Urban",
	"Adventure"
];
var TIPS = [
	{
		Icon: FileText,
		title: "Passport Renewal",
		body: "Renew at least 6 months before your travel date.",
		accent: "#60a5fa",
		bg: "rgba(96,165,250,0.12)"
	},
	{
		Icon: CreditCard,
		title: "Notify Your Bank",
		body: "Inform your bank before travelling internationally.",
		accent: "#34d399",
		bg: "rgba(52,211,153,0.12)"
	},
	{
		Icon: Luggage,
		title: "Pack Light",
		body: "Pack 30% less than you think you need.",
		accent: "#fbbf24",
		bg: "rgba(251,191,36,0.12)"
	},
	{
		Icon: BookMarked,
		title: "Print Bookings",
		body: "Always carry printed copies of all key documents.",
		accent: "#f87171",
		bg: "rgba(248,113,113,0.12)"
	}
];
function FeaturedCarousel() {
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(1);
	const intervalRef = useRef(null);
	const go = useCallback((idx, dir) => {
		setDirection(dir);
		setCurrent(idx);
	}, []);
	const next = useCallback(() => {
		setCurrent((c) => {
			const n = (c + 1) % DESTINATIONS.length;
			setDirection(1);
			return n;
		});
	}, []);
	const prev = useCallback(() => {
		setCurrent((c) => {
			const n = (c - 1 + DESTINATIONS.length) % DESTINATIONS.length;
			setDirection(-1);
			return n;
		});
	}, []);
	useEffect(() => {
		intervalRef.current = setInterval(next, 5e3);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [next]);
	const resetTimer = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(next, 5e3);
	};
	const dest = DESTINATIONS[current];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative rounded-3xl overflow-hidden h-80 md:h-[440px] select-none",
		style: {
			boxShadow: `0 8px 60px -12px hsl(${dest.themeColor} / 0.5)`,
			transition: "box-shadow 0.8s ease"
		},
		children: [
			/* @__PURE__ */ jsx(AnimatePresence, {
				custom: direction,
				mode: "sync",
				children: /* @__PURE__ */ jsxs(motion.div, {
					custom: direction,
					initial: {
						opacity: 0,
						scale: 1.04
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .98
					},
					transition: {
						duration: .75,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "absolute inset-0",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: dest.imageUrl,
							alt: dest.name,
							className: "absolute inset-0 w-full h-full object-cover",
							style: { objectPosition: "center 35%" }
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0",
							style: { background: `linear-gradient(to right, hsl(${dest.themeColor} / 0.9) 0%, hsl(${dest.themeColor} / 0.55) 45%, transparent 72%)` }
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0",
							style: { background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative z-10 h-full flex flex-col justify-between p-8 md:p-10",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-sm",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "Featured"
								}), /* @__PURE__ */ jsx("span", {
									className: "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
									style: {
										background: `hsl(${dest.themeColor} / 0.45)`,
										color: "rgba(255,255,255,0.9)",
										border: "1px solid rgba(255,255,255,0.15)",
										fontFamily: "Satoshi, sans-serif"
									},
									children: dest.region
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-end justify-between gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-white/55 text-sm font-semibold mb-1",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: dest.country
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "text-5xl md:text-7xl font-black text-white leading-[0.9] mb-2",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: dest.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-white/50 text-sm mb-4",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: dest.stats
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: dest.tags.map((tag) => /* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 backdrop-blur-sm border border-white/10",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: tag
										}, tag))
									})
								] }), /* @__PURE__ */ jsx(Link, {
									to: `/destinations/${dest.slug}`,
									className: "shrink-0",
									children: /* @__PURE__ */ jsx(motion.div, {
										className: "w-14 h-14 rounded-full flex items-center justify-center",
										style: {
											background: "rgba(255,255,255,0.12)",
											border: "1px solid rgba(255,255,255,0.3)",
											backdropFilter: "blur(10px)"
										},
										whileHover: {
											scale: 1.1,
											background: "rgba(255,255,255,0.22)"
										},
										whileTap: { scale: .95 },
										transition: {
											type: "spring",
											stiffness: 400,
											damping: 28
										},
										children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-white" })
									})
								})]
							})]
						})
					]
				}, dest.slug)
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					prev();
					resetTimer();
				},
				className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
				style: {
					background: "rgba(0,0,0,0.25)",
					border: "1px solid rgba(255,255,255,0.2)",
					backdropFilter: "blur(8px)",
					color: "#fff"
				},
				children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					next();
					resetTimer();
				},
				className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
				style: {
					background: "rgba(0,0,0,0.25)",
					border: "1px solid rgba(255,255,255,0.2)",
					backdropFilter: "blur(8px)",
					color: "#fff"
				},
				children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5",
				children: DESTINATIONS.map((_, i) => /* @__PURE__ */ jsx("button", {
					onClick: () => {
						go(i, i > current ? 1 : -1);
						resetTimer();
					},
					className: "rounded-full transition-all duration-400 cursor-pointer",
					style: {
						width: i === current ? 20 : 6,
						height: 6,
						background: i === current ? "#fff" : "rgba(255,255,255,0.35)"
					}
				}, i))
			})
		]
	});
}
function DestinationsPage() {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");
	const [region, setRegion] = useState("All");
	const filtered = DESTINATIONS.filter((d) => {
		const matchRegion = region === "All" || d.region === region;
		const q = search.toLowerCase();
		const matchSearch = q === "" || d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.tags.some((tag) => tag.toLowerCase().includes(q));
		return matchRegion && matchSearch;
	});
	const handleKeyword = (kw) => {
		setSearch((prev) => prev.toLowerCase() === kw.toLowerCase() ? "" : kw);
		setRegion("All");
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Destinations — Next Route Travels",
			description: "Every destination we feature is one we know intimately — Rome, Serengeti, Dubai, London and more, with curated guides to help you travel smarter.",
			canonicalPath: "/destinations"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative bg-[#0d1b38] overflow-hidden pt-[72px] pb-20 flex flex-col items-center justify-center min-h-[82vh]",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none",
					style: { background: "radial-gradient(circle, rgba(74,144,217,0.11) 0%, transparent 65%)" }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none",
					style: { background: "radial-gradient(circle, rgba(36,58,110,0.55) 0%, transparent 70%)" }
				}),
				/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute inset-0 pointer-events-none opacity-[0.022]",
					style: {
						backgroundImage: "radial-gradient(rgba(168,204,232,0.9) 1px, transparent 1px)",
						backgroundSize: "32px 32px"
					}
				}),
				[
					{
						name: "Rome",
						flag: "🇮🇹",
						top: "22%",
						left: "7%",
						delay: 0
					},
					{
						name: "Serengeti",
						flag: "🇹🇿",
						top: "55%",
						left: "4%",
						delay: .6
					},
					{
						name: "Dubai",
						flag: "🇦🇪",
						top: "18%",
						right: "6%",
						delay: 1.1
					},
					{
						name: "London",
						flag: "🇬🇧",
						top: "42%",
						right: "5%",
						delay: .3
					},
					{
						name: "New York",
						flag: "🇺🇸",
						top: "68%",
						right: "8%",
						delay: .9
					},
					{
						name: "Cartagena",
						flag: "🇨🇴",
						top: "75%",
						left: "6%",
						delay: 1.4
					},
					{
						name: "Buenos Aires",
						flag: "🇦🇷",
						top: "32%",
						left: "14%",
						delay: .5
					},
					{
						name: "Greek Islands",
						flag: "🇬🇷",
						top: "58%",
						right: "13%",
						delay: 1.7
					}
				].map((tag, i) => /* @__PURE__ */ jsxs(motion.div, {
					className: "absolute hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-1.5 select-none pointer-events-none",
					style: {
						top: tag.top,
						left: tag.left,
						right: tag.right,
						background: "rgba(255,255,255,0.05)",
						border: "1px solid rgba(255,255,255,0.1)",
						backdropFilter: "blur(8px)"
					},
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: [
							0,
							.65,
							.65,
							0
						],
						y: [
							10,
							0,
							0,
							-6
						]
					},
					transition: {
						duration: 5,
						delay: tag.delay,
						repeat: Infinity,
						repeatDelay: 2 + i * .4,
						ease: "easeInOut"
					},
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: tag.flag
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[12px] font-semibold text-white/70",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: tag.name
					})]
				}, tag.name)),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 text-center",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 28
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "w-full",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-4 backdrop-blur-sm",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("destinations_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3 leading-[0.95]",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("destinations_page.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-base text-white/40 max-w-md mx-auto mb-8",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("destinations_page.sub")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative w-full rounded-2xl overflow-hidden",
								style: {
									background: "rgba(13,27,56,0.75)",
									border: "1px solid rgba(168,204,232,0.18)",
									backdropFilter: "blur(20px)",
									boxShadow: "0 8px 40px rgba(0,0,0,0.35)"
								},
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center px-4 gap-3",
									children: [
										/* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-white/35 shrink-0" }),
										/* @__PURE__ */ jsx("input", {
											type: "text",
											placeholder: t("destinations_page.search_placeholder"),
											value: search,
											onChange: (e) => setSearch(e.target.value),
											className: "flex-1 h-14 bg-transparent text-sm text-white placeholder:text-white/30 outline-none",
											style: { fontFamily: "Satoshi, sans-serif" }
										}),
										/* @__PURE__ */ jsx(AnimatePresence, { children: search && /* @__PURE__ */ jsx(motion.button, {
											initial: {
												opacity: 0,
												scale: .8
											},
											animate: {
												opacity: 1,
												scale: 1
											},
											exit: {
												opacity: 0,
												scale: .8
											},
											type: "button",
											onClick: () => setSearch(""),
											className: "w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0",
											children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3 text-white/60" })
										}) })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 px-4 pb-3 flex-wrap",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 shrink-0",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: "Popular:"
									}), KEYWORD_TAGS.map((kw) => {
										const active = search.toLowerCase() === kw.toLowerCase();
										return /* @__PURE__ */ jsx(motion.button, {
											type: "button",
											onClick: () => handleKeyword(kw),
											whileHover: { scale: 1.04 },
											whileTap: { scale: .96 },
											className: "px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer",
											style: {
												fontFamily: "Satoshi, sans-serif",
												background: active ? "#4a90d9" : "rgba(255,255,255,0.07)",
												color: active ? "#fff" : "rgba(255,255,255,0.45)",
												border: active ? "1px solid #4a90d9" : "1px solid rgba(255,255,255,0.12)"
											},
											children: kw
										}, kw);
									})]
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-10 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto",
				children: /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: false,
						margin: "200px 0px -60px 0px"
					},
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ jsx(FeaturedCarousel, {})
				})
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "pb-28 bg-[#f5f8fc]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "sticky z-30 px-6 py-4",
				style: {
					top: 72,
					background: "rgba(245,248,252,0.88)",
					backdropFilter: "blur(20px) saturate(180%)",
					borderBottom: "1px solid rgba(13,27,56,0.06)"
				},
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto flex flex-wrap gap-2",
					children: REGION_KEYS.map(({ value, key }) => /* @__PURE__ */ jsx(motion.button, {
						type: "button",
						onClick: () => setRegion(value),
						whileHover: { scale: 1.03 },
						whileTap: { scale: .97 },
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 28
						},
						className: "px-5 py-2 rounded-full text-sm font-semibold cursor-pointer",
						style: {
							fontFamily: "Satoshi, sans-serif",
							background: region === value ? "#1a2f5a" : "transparent",
							color: region === value ? "#fff" : "rgba(13,27,56,0.55)",
							border: region === value ? "1px solid transparent" : "1px solid rgba(26,47,90,0.18)",
							transition: "background 0.2s, color 0.2s, border-color 0.2s"
						},
						children: t(`destinations_page.${key}`)
					}, value))
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-6 pt-8",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "popLayout",
						children: filtered.map((dest, i) => /* @__PURE__ */ jsx(motion.div, {
							layout: true,
							className: "h-[420px]",
							initial: {
								opacity: 0,
								y: 36,
								scale: .95
							},
							animate: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .93,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							viewport: {
								once: false,
								margin: "200px 0px -40px 0px"
							},
							transition: {
								duration: .55,
								ease: [
									.22,
									1,
									.36,
									1
								],
								delay: i % 3 * .07
							},
							children: /* @__PURE__ */ jsx(DestinationCard, {
								imageUrl: dest.imageUrl,
								location: dest.name,
								flag: dest.flag,
								stats: dest.stats,
								href: `/destinations/${dest.slug}`,
								themeColor: dest.themeColor,
								className: "h-full"
							})
						}, dest.name))
					})
				}), filtered.length === 0 && /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "text-center py-20",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-slate-400 text-lg mb-4",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [
							t("destinations_page.no_results"),
							" \"",
							search,
							"\""
						]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => {
							setSearch("");
							setRegion("All");
						},
						className: "px-5 py-2 rounded-full text-sm font-semibold text-white transition-colors",
						style: {
							background: "#1a2f5a",
							fontFamily: "Satoshi, sans-serif"
						},
						children: "Clear filters"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "text-center mb-14",
					initial: {
						opacity: 0,
						y: 28
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: false,
						margin: "200px 0px -60px 0px"
					},
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: "Smart Traveller Tips"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					children: TIPS.map(({ Icon, title, body, accent, bg }, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 28
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: false,
							margin: "200px 0px -40px 0px"
						},
						transition: {
							duration: .65,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: i * .1
						},
						className: "relative p-7 rounded-2xl overflow-hidden transition-all duration-500",
						style: {
							background: "rgba(255,255,255,0.03)",
							border: `1px solid ${accent}28`
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.background = "rgba(255,255,255,0.06)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = "rgba(255,255,255,0.03)";
						},
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-0 left-0 right-0 h-px",
								style: { background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }
							}),
							/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
								style: { background: bg },
								children: /* @__PURE__ */ jsx(Icon, {
									className: "w-5 h-5",
									style: { color: accent }
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-base font-black text-white mb-3",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-white/40 leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: body
							})
						]
					}, title))
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/OurStoryPage.tsx
var SPRING = {
	type: "spring",
	stiffness: 400,
	damping: 30
};
var fadeUp$1 = {
	initial: {
		opacity: 0,
		y: 40
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: false,
		margin: "200px 0px -60px 0px"
	},
	transition: {
		duration: .65,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
function Eyebrow$1({ label, dark = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
		style: {
			background: dark ? "rgba(74,144,217,0.12)" : "rgba(74,144,217,0.1)",
			border: "1px solid rgba(74,144,217,0.25)"
		},
		children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#4a90d9]" }), /* @__PURE__ */ jsx("span", {
			className: "text-[11px] font-black uppercase tracking-[0.22em] text-[#4a90d9]",
			style: { fontFamily: "Satoshi, sans-serif" },
			children: label
		})]
	});
}
function WaveBridge({ from, to }) {
	return /* @__PURE__ */ jsx("div", {
		style: {
			background: to,
			marginTop: -1,
			lineHeight: 0
		},
		children: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 1440 72",
			preserveAspectRatio: "none",
			style: {
				display: "block",
				width: "100%",
				height: 72
			},
			children: /* @__PURE__ */ jsx("path", {
				d: "M0,0 C360,72 1080,72 1440,0 L1440,0 L0,0 Z",
				fill: from
			})
		})
	});
}
function ValueCard({ Icon, nameKey, bodyKey, accent, num, delay = 0, wide = false }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs(motion.div, {
		className: `rounded-[28px] relative overflow-hidden ${wide ? "lg:col-span-12" : "lg:col-span-6"}`,
		style: {
			background: "rgba(255,255,255,0.04)",
			border: `1px solid ${accent}30`,
			minHeight: wide ? 180 : 300
		},
		...fadeUp$1,
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		},
		whileHover: {
			borderColor: `${accent}55`,
			background: "rgba(255,255,255,0.06)"
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-0 left-0 right-0 h-[2px]",
				style: { background: `linear-gradient(90deg, ${accent}80, transparent)` }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "absolute select-none pointer-events-none font-black leading-none text-white/[0.04]",
				style: {
					fontFamily: "Clash Display, sans-serif",
					fontSize: wide ? "14rem" : "10rem",
					top: wide ? "50%" : "-0.1em",
					right: "1rem",
					transform: wide ? "translateY(-50%)" : void 0
				},
				children: num
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute -bottom-6 -left-6 w-40 h-40 rounded-full pointer-events-none",
				style: { background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }
			}),
			wide ? /* @__PURE__ */ jsxs("div", {
				className: "relative p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12",
				children: [/* @__PURE__ */ jsx("div", {
					className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
					style: {
						background: `${accent}18`,
						border: `1px solid ${accent}30`
					},
					children: /* @__PURE__ */ jsx("span", {
						style: { color: accent },
						children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" })
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-2xl lg:text-3xl font-black text-white leading-tight mb-2",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t(`our_story_page.${nameKey}`)
					}), /* @__PURE__ */ jsx("p", {
						className: "text-white/40 text-sm leading-relaxed max-w-2xl",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: t(`our_story_page.${bodyKey}`)
					})]
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "relative p-8 lg:p-10 h-full flex flex-col",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-7",
						style: {
							background: `${accent}18`,
							border: `1px solid ${accent}30`
						},
						children: /* @__PURE__ */ jsx("span", {
							style: { color: accent },
							children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" })
						})
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-2xl font-black text-white leading-tight mb-3",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t(`our_story_page.${nameKey}`)
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-white/40 text-sm leading-relaxed",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: t(`our_story_page.${bodyKey}`)
					})
				]
			})
		]
	});
}
function ServiceRow({ Icon, label, bodyKey, accent, num, reverse = false, delay = 0 }) {
	const { t } = useTranslation();
	const card = /* @__PURE__ */ jsxs(motion.div, {
		className: "rounded-[28px] overflow-hidden relative",
		style: {
			background: `${accent}0d`,
			border: `1px solid ${accent}28`,
			minHeight: 220
		},
		...fadeUp$1,
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		},
		whileHover: { background: `${accent}16` },
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "absolute -top-2 right-4 text-[8rem] font-black leading-none select-none pointer-events-none",
				style: {
					fontFamily: "Clash Display, sans-serif",
					color: `${accent}10`
				},
				children: num
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-0 left-0 right-0 h-[2px]",
				style: { background: `linear-gradient(90deg, ${accent}70, transparent)` }
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative p-8 lg:p-10 h-full flex flex-col justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
					style: {
						background: `${accent}15`,
						border: `1px solid ${accent}25`
					},
					children: /* @__PURE__ */ jsx("span", {
						style: { color: accent },
						children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" })
					})
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[11px] font-black uppercase tracking-[0.22em] mb-1 block",
					style: {
						color: accent,
						fontFamily: "Satoshi, sans-serif"
					},
					children: label
				})] }), /* @__PURE__ */ jsxs(Link, {
					to: "/services",
					className: "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200",
					style: {
						color: accent,
						fontFamily: "Satoshi, sans-serif"
					},
					children: ["Learn more ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })]
				})]
			})
		]
	});
	const text = /* @__PURE__ */ jsx(motion.div, {
		className: "flex items-center",
		...fadeUp$1,
		transition: {
			duration: .65,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay: delay + .1
		},
		children: /* @__PURE__ */ jsx("p", {
			className: "text-[#0d1b38]/55 text-[15px] leading-[1.85]",
			style: { fontFamily: "Satoshi, sans-serif" },
			children: t(`our_story_page.${bodyKey}`)
		})
	});
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",
		children: reverse ? /* @__PURE__ */ jsxs(Fragment, { children: [text, card] }) : /* @__PURE__ */ jsxs(Fragment, { children: [card, text] })
	});
}
function OurStoryPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Our Story — Next Route Travels",
			description: "Learn about the people and purpose behind Next Route Travels — a Lagos-based agency built to make world-class travel accessible across Africa and beyond.",
			canonicalPath: "/our-story"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[90vh] flex flex-col justify-center bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none",
					style: { background: "radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 65%)" }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none",
					style: { background: "radial-gradient(circle, rgba(36,58,110,0.6) 0%, transparent 70%)" }
				}),
				/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute inset-0 opacity-[0.025] pointer-events-none",
					style: {
						backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
						backgroundSize: "72px 72px"
					}
				}),
				[
					{
						top: "18%",
						left: "8%",
						size: 3,
						delay: 0
					},
					{
						top: "55%",
						left: "5%",
						size: 2,
						delay: .4
					},
					{
						top: "30%",
						right: "10%",
						size: 4,
						delay: .8
					},
					{
						top: "70%",
						right: "8%",
						size: 2,
						delay: 1.2
					}
				].map((dot, i) => /* @__PURE__ */ jsx(motion.div, {
					className: "absolute rounded-full bg-[#4a90d9] pointer-events-none",
					style: {
						width: dot.size,
						height: dot.size,
						top: dot.top,
						left: dot.left,
						right: dot.right
					},
					animate: {
						y: [
							0,
							-8,
							0
						],
						opacity: [
							.3,
							.7,
							.3
						]
					},
					transition: {
						duration: 3.5 + i,
						repeat: Infinity,
						ease: "easeInOut",
						delay: dot.delay
					}
				}, i)),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-36 pb-32 w-full",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 28
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .75,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "max-w-4xl",
						children: [
							/* @__PURE__ */ jsx(Eyebrow$1, {
								label: t("our_story_page.eyebrow"),
								dark: true
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white mb-6",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: [
									t("our_story_page.heading"),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("em", {
										className: "not-italic",
										style: {
											background: "linear-gradient(135deg, #4a90d9 0%, #a8cce8 100%)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
											backgroundClip: "text"
										},
										children: t("our_story_page.heading_accent")
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[17px] text-white/45 max-w-2xl leading-[1.75]",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("our_story_page.sub")
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "relative z-10 mx-4 sm:mx-8 mb-10 max-w-7xl lg:mx-auto",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .75,
						ease: [
							.22,
							1,
							.36,
							1
						],
						delay: .25
					},
					children: /* @__PURE__ */ jsx("div", {
						className: "rounded-2xl grid grid-cols-2 sm:grid-cols-4 divide-x",
						style: {
							background: "rgba(255,255,255,0.05)",
							border: "1px solid rgba(255,255,255,0.1)",
							backdropFilter: "blur(24px)"
						},
						children: [
							{
								val: "12+",
								label: "Years Serving"
							},
							{
								val: "50+",
								label: "Countries Reached"
							},
							{
								val: "4.9★",
								label: "Client Rating"
							},
							{
								val: "1K+",
								label: "Trips Planned"
							}
						].map(({ val, label }, i) => /* @__PURE__ */ jsxs("div", {
							className: "py-5 px-6 text-center",
							style: { borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : void 0 },
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-black text-white leading-none mb-1",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: val
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-bold uppercase tracking-[0.2em] text-white/30",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: label
							})]
						}, label))
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(WaveBridge, {
			from: "#0d1b38",
			to: "#f5f8fc"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "lg:col-span-7",
					...fadeUp$1,
					children: [
						/* @__PURE__ */ jsx(Eyebrow$1, { label: t("our_story_page.mission_eyebrow") }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl sm:text-[3rem] lg:text-[3.4rem] font-black tracking-tight leading-[0.95] text-[#0d1b38] mb-8",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("our_story_page.mission_heading")
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-5",
							children: [
								"mission_body1",
								"mission_body2",
								"mission_body3"
							].map((key) => /* @__PURE__ */ jsx("p", {
								className: "text-[#0d1b38]/55 text-[15px] leading-[1.85]",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t(`our_story_page.${key}`)
							}, key))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-10 flex items-center gap-0",
							children: [
								"Lagos",
								"London",
								"Dubai",
								"New York"
							].map((city, i, arr) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-2.5 h-2.5 rounded-full bg-[#4a90d9]",
										style: { boxShadow: "0 0 8px rgba(74,144,217,0.5)" }
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-black uppercase tracking-widest text-[#0d1b38]/40",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: city
									})]
								}), i < arr.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-10 sm:w-16 h-px bg-[#4a90d9]/25 mb-4" })]
							}, city))
						})
					]
				}), /* @__PURE__ */ jsx(motion.div, {
					className: "lg:col-span-5",
					...fadeUp$1,
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						],
						delay: .15
					},
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-[28px] overflow-hidden",
						style: { background: "#0d1b38" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-8 lg:p-10 relative",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute -top-4 -left-2 pointer-events-none select-none",
									style: {
										background: "radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)",
										width: 160,
										height: 160,
										borderRadius: "50%"
									}
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-[100px] leading-[0.75] text-[#4a90d9]/20 font-black select-none -mb-3",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "\""
								}),
								/* @__PURE__ */ jsx("blockquote", {
									className: "text-xl lg:text-2xl font-black leading-snug text-white mb-5",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: t("our_story_page.mission_quote")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/35 text-[13px] leading-relaxed",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("our_story_page.mission_quote_sub")
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-8 lg:px-10 py-5 flex items-center gap-3",
							style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
								style: {
									background: "rgba(74,144,217,0.15)",
									border: "1px solid rgba(74,144,217,0.25)"
								},
								children: /* @__PURE__ */ jsx("span", {
									className: "text-[#4a90d9] text-xs font-black",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "NR"
								})
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-white text-[13px] font-bold",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Next Route Travels"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-white/30 text-[11px]",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Lagos, Nigeria"
							})] })]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx(WaveBridge, {
			from: "#f5f8fc",
			to: "#0d1b38"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "text-center mb-14",
					...fadeUp$1,
					children: [/* @__PURE__ */ jsx(Eyebrow$1, {
						label: "Our Values",
						dark: true
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("our_story_page.values_heading")
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-4",
					children: [
						/* @__PURE__ */ jsx(ValueCard, {
							Icon: Zap,
							nameKey: "value_reliability_name",
							bodyKey: "value_reliability_body",
							accent: "#60a5fa",
							num: "01",
							delay: 0
						}),
						/* @__PURE__ */ jsx(ValueCard, {
							Icon: Shield,
							nameKey: "value_safety_name",
							bodyKey: "value_safety_body",
							accent: "#34d399",
							num: "02",
							delay: .1
						}),
						/* @__PURE__ */ jsx(ValueCard, {
							Icon: Heart,
							nameKey: "value_passion_name",
							bodyKey: "value_passion_body",
							accent: "#f43f5e",
							num: "03",
							delay: .2,
							wide: true
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(WaveBridge, {
			from: "#0d1b38",
			to: "#f5f8fc"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "mb-16",
					...fadeUp$1,
					children: [/* @__PURE__ */ jsx(Eyebrow$1, { label: t("our_story_page.what_we_do_eyebrow") }), /* @__PURE__ */ jsx("h2", {
						className: "text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-[#0d1b38]",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("our_story_page.what_we_do_heading")
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsx(ServiceRow, {
							Icon: Plane,
							label: "Global Air Connections",
							bodyKey: "what_we_do_body1",
							accent: "#60a5fa",
							num: "01",
							delay: 0
						}),
						/* @__PURE__ */ jsx(ServiceRow, {
							Icon: MapPin,
							label: "Cross-Border Road Travel",
							bodyKey: "what_we_do_body2",
							accent: "#34d399",
							num: "02",
							reverse: true,
							delay: .08
						}),
						/* @__PURE__ */ jsx(ServiceRow, {
							Icon: BookOpen,
							label: "Destination Intelligence",
							bodyKey: "what_we_do_body3",
							accent: "#fbbf24",
							num: "03",
							delay: .16
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(WaveBridge, {
			from: "#f5f8fc",
			to: "#0d1b38"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative py-28 sm:py-36 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none",
					"aria-hidden": true,
					children: /* @__PURE__ */ jsx("div", {
						className: "w-[700px] h-[700px] rounded-full",
						style: { background: "radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 65%)" }
					})
				}),
				/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute inset-0 opacity-[0.02] pointer-events-none",
					style: {
						backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
						backgroundSize: "72px 72px"
					}
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "relative z-10 max-w-4xl mx-auto text-center",
					...fadeUp$1,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "text-[clamp(80px,15vw,160px)] leading-[0.7] text-[#4a90d9]/15 font-black select-none mb-2",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: "\""
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-3xl sm:text-4xl lg:text-[2.8rem] font-black text-white leading-[1.1] tracking-tight mb-10",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("our_story_page.brand_quote")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-4 mb-10",
							children: [
								/* @__PURE__ */ jsx("div", { className: "w-12 h-px bg-white/10" }),
								/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[#4a90d9]/50" }),
								/* @__PURE__ */ jsx("div", { className: "w-12 h-px bg-white/10" })
							]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/enquiries",
							children: /* @__PURE__ */ jsxs(motion.div, {
								className: "inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white",
								whileHover: {
									scale: 1.03,
									y: -2
								},
								whileTap: { scale: .97 },
								transition: SPRING,
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[14px] font-bold text-[#0d1b38]",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("our_story_page.brand_cta")
								}), /* @__PURE__ */ jsx("span", {
									className: "w-10 h-10 rounded-full bg-[#0d1b38] flex items-center justify-center",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-white" })
								})]
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
}
//#endregion
//#region src/components/ui/faq-section.tsx
function AccordionItem({ item, index, isOpen, onToggle }) {
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 14
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: false,
			margin: "200px 0px -20px 0px"
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay: index * .045
		},
		className: "rounded-2xl overflow-hidden",
		style: {
			border: isOpen ? "1px solid rgba(74,144,217,0.28)" : "1px solid rgba(13,27,56,0.08)",
			background: isOpen ? "rgba(74,144,217,0.04)" : "#fff",
			transition: "border-color 0.3s ease, background 0.3s ease",
			boxShadow: isOpen ? "0 4px 20px -4px rgba(74,144,217,0.12)" : "none"
		},
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: onToggle,
			className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[15px] font-bold leading-snug",
				style: {
					fontFamily: "Satoshi, sans-serif",
					color: "#0d1b38"
				},
				children: item.q
			}), /* @__PURE__ */ jsx(motion.div, {
				className: "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
				animate: { background: isOpen ? "#4a90d9" : "rgba(13,27,56,0.07)" },
				transition: { duration: .25 },
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					initial: false,
					children: isOpen ? /* @__PURE__ */ jsx(motion.span, {
						initial: {
							opacity: 0,
							rotate: -90
						},
						animate: {
							opacity: 1,
							rotate: 0
						},
						exit: {
							opacity: 0,
							rotate: 90
						},
						transition: { duration: .18 },
						children: /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5 text-white" })
					}, "minus") : /* @__PURE__ */ jsx(motion.span, {
						initial: {
							opacity: 0,
							rotate: 90
						},
						animate: {
							opacity: 1,
							rotate: 0
						},
						exit: {
							opacity: 0,
							rotate: -90
						},
						transition: { duration: .18 },
						children: /* @__PURE__ */ jsx(Plus, {
							className: "w-3.5 h-3.5",
							style: { color: "#0d1b38" }
						})
					}, "plus")
				})
			})]
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			initial: false,
			children: isOpen && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: {
					duration: .38,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsx("p", {
					className: "px-6 pb-6 text-sm leading-[1.85]",
					style: {
						fontFamily: "Satoshi, sans-serif",
						color: "rgba(13,27,56,0.52)"
					},
					children: item.a
				})
			}, "body")
		})]
	});
}
function Eyebrow({ label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
		style: {
			background: "rgba(74,144,217,0.1)",
			border: "1px solid rgba(74,144,217,0.22)"
		},
		children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#4a90d9]" }), /* @__PURE__ */ jsx("span", {
			className: "text-[11px] font-black uppercase tracking-[0.2em] text-[#4a90d9]",
			style: { fontFamily: "Satoshi, sans-serif" },
			children: label
		})]
	});
}
function FaqSection({ items, image, eyebrow = "FAQ", heading = "Frequently Asked Questions", sub }) {
	const [openIndex, setOpenIndex] = useState(null);
	const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
	if (image) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col lg:flex-row items-start gap-10 xl:gap-16",
		children: [/* @__PURE__ */ jsx(motion.div, {
			className: "w-full lg:w-[380px] shrink-0",
			initial: {
				opacity: 0,
				x: -24
			},
			whileInView: {
				opacity: 1,
				x: 0
			},
			viewport: {
				once: false,
				margin: "200px 0px -60px 0px"
			},
			transition: {
				duration: .75,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative rounded-3xl overflow-hidden",
				style: {
					aspectRatio: "3/4",
					boxShadow: "0 24px 72px -12px rgba(13,27,56,0.22)"
				},
				children: [
					/* @__PURE__ */ jsx("img", {
						src: image,
						alt: "FAQ illustration",
						className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105",
						style: { objectPosition: "center 35%" }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(to top, rgba(13,27,56,0.88) 0%, rgba(13,27,56,0.3) 50%, transparent 75%)" }
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(to right, rgba(74,144,217,0.25) 0%, transparent 60%)" }
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute bottom-0 left-0 right-0 p-7",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4",
								style: {
									background: "rgba(74,144,217,0.2)",
									border: "1px solid rgba(74,144,217,0.3)",
									backdropFilter: "blur(8px)"
								},
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-black uppercase tracking-[0.2em] text-blue-300",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "Support"
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-white font-black text-2xl leading-[1.1]",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: [
									"We're here",
									/* @__PURE__ */ jsx("br", {}),
									"to help."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/45 text-xs mt-2",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Answering within a few hours, 6 days a week."
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ jsxs(motion.div, {
			className: "flex-1 min-w-0",
			initial: {
				opacity: 0,
				x: 24
			},
			whileInView: {
				opacity: 1,
				x: 0
			},
			viewport: {
				once: false,
				margin: "200px 0px -60px 0px"
			},
			transition: {
				duration: .75,
				ease: [
					.22,
					1,
					.36,
					1
				],
				delay: .08
			},
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { label: eyebrow }),
				/* @__PURE__ */ jsx("h2", {
					className: "text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-3",
					style: {
						fontFamily: "Clash Display, sans-serif",
						color: "#0d1b38"
					},
					children: heading
				}),
				sub && /* @__PURE__ */ jsx("p", {
					className: "text-sm leading-[1.75] mb-8 max-w-lg",
					style: {
						fontFamily: "Satoshi, sans-serif",
						color: "rgba(13,27,56,0.48)"
					},
					children: sub
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-2.5",
					children: items.map((item, i) => /* @__PURE__ */ jsx(AccordionItem, {
						item,
						index: i,
						isOpen: openIndex === i,
						onToggle: () => toggle(i)
					}, i))
				})
			]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-2xl mx-auto text-center",
		children: [
			/* @__PURE__ */ jsx(Eyebrow, { label: eyebrow }),
			/* @__PURE__ */ jsx("h2", {
				className: "text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-3",
				style: {
					fontFamily: "Clash Display, sans-serif",
					color: "#0d1b38"
				},
				children: heading
			}),
			sub && /* @__PURE__ */ jsx("p", {
				className: "text-sm leading-[1.75] mb-10",
				style: {
					fontFamily: "Satoshi, sans-serif",
					color: "rgba(13,27,56,0.48)"
				},
				children: sub
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-2.5 text-left mt-8",
				children: items.map((item, i) => /* @__PURE__ */ jsx(AccordionItem, {
					item,
					index: i,
					isOpen: openIndex === i,
					onToggle: () => toggle(i)
				}, i))
			})
		]
	});
}
//#endregion
//#region src/pages/EnquiriesPage.tsx
var fadeUp = {
	initial: {
		opacity: 0,
		y: 40
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: false,
		margin: "200px 0px -60px 0px"
	},
	transition: {
		duration: .65,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
var schema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Enter a valid email address"),
	phone: z.string().min(6, "Phone number is required"),
	serviceType: z.string().min(1, "Please select a service"),
	destination: z.string().min(1, "Destination or route is required"),
	preferredDate: z.string().min(1, "Preferred date is required"),
	travellers: z.string().min(1, "At least 1 traveller required"),
	message: z.string().optional()
});
var FAQS = [
	{
		q: "How do I book a trip with Next Route Travels?",
		a: "Fill out our enquiry form above or contact us directly via email or phone. We'll get back to you within a few hours with available options and a plan tailored to your needs."
	},
	{
		q: "Do you handle visa applications?",
		a: "We provide guidance, documentation checklists, and referrals to trusted visa processing partners. While we don't process visas directly, we make the process significantly easier."
	},
	{
		q: "How far in advance should I book?",
		a: "We recommend booking international flights at least 6–8 weeks in advance, and road charters 2 weeks ahead. Expedition packages require 4–6 weeks for full planning."
	},
	{
		q: "Can you arrange group travel?",
		a: "Absolutely. Group bookings are one of our specialties — from church tours and student trips to corporate retreats. We coordinate logistics for groups of any size."
	},
	{
		q: "What payment methods do you accept?",
		a: "We accept bank transfers (NGN and USD), mobile payments, and international cards. Payment plans may be available for expedition packages upon request."
	},
	{
		q: "What if I need to cancel or change my booking?",
		a: "Cancellation and change policies depend on the service and timing. We'll walk you through applicable terms at booking. We always aim for flexible solutions for our travelers."
	}
];
var POPULAR_ROUTES = [
	"Lagos → London",
	"Lagos → Dubai",
	"Abuja → New York",
	"Lagos → Accra"
];
function Label({ children }) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-[10px] font-black uppercase tracking-[0.18em] mb-2",
		style: {
			fontFamily: "Satoshi, sans-serif",
			color: "rgba(13,27,56,0.38)"
		},
		children
	});
}
function FieldWrap({ error, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [children, error && /* @__PURE__ */ jsx("p", {
		className: "mt-1.5 text-[11px] text-red-500 font-semibold",
		style: { fontFamily: "Satoshi, sans-serif" },
		children: error
	})] });
}
var inputBase = "w-full h-13 rounded-2xl border px-4 text-sm text-[#0d1b38] placeholder:text-[rgba(13,27,56,0.3)] outline-none transition-all duration-200 bg-[#f5f8fc]";
var inputNormal = `${inputBase} border-[rgba(13,27,56,0.1)] focus:border-[#4a90d9] focus:bg-white focus:ring-2 focus:ring-[rgba(74,144,217,0.15)]`;
var inputError = `${inputBase} border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
function SuccessState({ onReset, t }) {
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			scale: .96
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "flex flex-col items-center justify-center text-center py-16 space-y-5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "w-16 h-16 rounded-full flex items-center justify-center",
				style: {
					background: "rgba(52,211,153,0.12)",
					border: "1px solid rgba(52,211,153,0.3)"
				},
				children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-7 h-7 text-emerald-500" })
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-2xl font-black text-[#0d1b38] mb-2",
				style: { fontFamily: "Clash Display, sans-serif" },
				children: t("enquiries_page.form_success_heading")
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-[rgba(13,27,56,0.5)] max-w-xs mx-auto",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t("enquiries_page.form_success_body")
			})] }),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onReset,
				className: "text-sm font-bold text-[#4a90d9] hover:underline cursor-pointer",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t("enquiries_page.form_success_new")
			})
		]
	});
}
function EnquiryForm() {
	const { t } = useTranslation();
	const [submitted, setSubmitted] = useState(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
	const onSubmit = () => setSubmitted(true);
	if (submitted) return /* @__PURE__ */ jsx(SuccessState, {
		onReset: () => setSubmitted(false),
		t
	});
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit(onSubmit),
		className: "space-y-5",
		noValidate: true,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.fullName?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_name"), " *"] }), /* @__PURE__ */ jsx("input", {
						...register("fullName"),
						placeholder: t("enquiries_page.form_name_placeholder"),
						className: errors.fullName ? inputError : inputNormal,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						}
					})]
				}), /* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.email?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_email"), " *"] }), /* @__PURE__ */ jsx("input", {
						...register("email"),
						type: "email",
						placeholder: t("enquiries_page.form_email_placeholder"),
						className: errors.email ? inputError : inputNormal,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						}
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.phone?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_phone"), " *"] }), /* @__PURE__ */ jsx("input", {
						...register("phone"),
						type: "tel",
						placeholder: t("enquiries_page.form_phone_placeholder"),
						className: errors.phone ? inputError : inputNormal,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						}
					})]
				}), /* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.serviceType?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_service"), " *"] }), /* @__PURE__ */ jsxs("select", {
						...register("serviceType"),
						defaultValue: "",
						className: `${errors.serviceType ? inputError : inputNormal} cursor-pointer`,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						},
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "",
								disabled: true,
								children: t("enquiries_page.form_service_placeholder")
							}),
							/* @__PURE__ */ jsx("option", {
								value: "flights",
								children: t("enquiries_page.form_service_flight")
							}),
							/* @__PURE__ */ jsx("option", {
								value: "road",
								children: t("enquiries_page.form_service_road")
							}),
							/* @__PURE__ */ jsx("option", {
								value: "expedition",
								children: t("enquiries_page.form_service_latam")
							}),
							/* @__PURE__ */ jsx("option", {
								value: "general",
								children: t("enquiries_page.form_service_other")
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(FieldWrap, {
				error: errors.destination?.message,
				children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_destination"), " *"] }), /* @__PURE__ */ jsx("input", {
					...register("destination"),
					placeholder: t("enquiries_page.form_destination_placeholder"),
					className: errors.destination ? inputError : inputNormal,
					style: {
						fontFamily: "Satoshi, sans-serif",
						height: 52
					}
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.preferredDate?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_date"), " *"] }), /* @__PURE__ */ jsx("input", {
						...register("preferredDate"),
						type: "date",
						className: errors.preferredDate ? inputError : inputNormal,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						}
					})]
				}), /* @__PURE__ */ jsxs(FieldWrap, {
					error: errors.travellers?.message,
					children: [/* @__PURE__ */ jsxs(Label, { children: [t("enquiries_page.form_passengers"), " *"] }), /* @__PURE__ */ jsx("input", {
						...register("travellers"),
						type: "number",
						min: 1,
						placeholder: t("enquiries_page.form_passengers_placeholder"),
						className: errors.travellers ? inputError : inputNormal,
						style: {
							fontFamily: "Satoshi, sans-serif",
							height: 52
						}
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(FieldWrap, { children: [/* @__PURE__ */ jsx(Label, { children: t("enquiries_page.form_message") }), /* @__PURE__ */ jsx("textarea", {
				...register("message"),
				rows: 4,
				placeholder: t("enquiries_page.form_message_placeholder"),
				className: "w-full rounded-2xl border border-[rgba(13,27,56,0.1)] px-4 py-3.5 text-sm text-[#0d1b38] placeholder:text-[rgba(13,27,56,0.3)] bg-[#f5f8fc] outline-none transition-all duration-200 focus:border-[#4a90d9] focus:bg-white focus:ring-2 focus:ring-[rgba(74,144,217,0.15)] resize-none",
				style: { fontFamily: "Satoshi, sans-serif" }
			})] }),
			/* @__PURE__ */ jsxs(motion.button, {
				type: "submit",
				className: "w-full flex items-center justify-between pl-7 pr-2.5 py-2.5 rounded-full cursor-pointer",
				style: {
					background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
					boxShadow: "0 8px 32px -8px rgba(13,27,56,0.45)"
				},
				whileHover: { scale: 1.015 },
				whileTap: { scale: .985 },
				transition: {
					type: "spring",
					stiffness: 400,
					damping: 30
				},
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm font-bold text-white",
					style: { fontFamily: "Satoshi, sans-serif" },
					children: t("enquiries_page.form_submit")
				}), /* @__PURE__ */ jsx("span", {
					className: "w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0",
					children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-white" })
				})]
			})
		]
	});
}
function ContactRow({ Icon, label, value, accent }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-4 py-5",
		style: { borderBottom: "1px solid rgba(255,255,255,0.07)" },
		children: [/* @__PURE__ */ jsx("div", {
			className: "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
			style: {
				background: `${accent}18`,
				border: `1px solid ${accent}30`
			},
			children: /* @__PURE__ */ jsx(Icon, {
				className: "w-4 h-4",
				style: { color: accent }
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[10px] font-black uppercase tracking-[0.18em] mb-0.5",
				style: {
					fontFamily: "Satoshi, sans-serif",
					color: "rgba(255,255,255,0.3)"
				},
				children: label
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold text-white whitespace-pre-line leading-snug",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: value
			})]
		})]
	});
}
function EnquiriesPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Contact Us — Next Route Travels",
			description: "Get in touch with Next Route Travels to start planning your journey. Flights, road trips, and expeditions — we handle every route.",
			canonicalPath: "/enquiries"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[45vh] flex items-center bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-400/6 blur-[80px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 w-full",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("enquiries_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-[0.93]",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("enquiries_page.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xl text-white/45 max-w-xl",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("enquiries_page.sub")
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					...fadeUp,
					className: "rounded-3xl overflow-hidden",
					style: { boxShadow: "0 8px 48px -12px rgba(13,27,56,0.14)" },
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative px-8 md:px-10 pt-10 pb-9 bg-[#0d1b38] overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none",
								style: {
									background: "rgba(74,144,217,0.12)",
									filter: "blur(80px)",
									transform: "translate(30%,-30%)"
								}
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 opacity-[0.035] pointer-events-none",
								style: {
									backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
									backgroundSize: "22px 22px"
								}
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
										style: {
											background: "rgba(74,144,217,0.15)",
											border: "1px solid rgba(74,144,217,0.3)"
										},
										children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
											className: "text-[11px] font-black uppercase tracking-[0.2em] text-blue-300",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: "New Enquiry"
										})]
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "text-3xl md:text-4xl font-black text-white leading-[0.95] mb-2",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: t("enquiries_page.heading")
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-white/40",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: "We respond within a few hours. No commitment required."
									})
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "bg-white px-8 md:px-10 py-9",
						children: /* @__PURE__ */ jsx(EnquiryForm, {})
					})]
				}), /* @__PURE__ */ jsxs(motion.div, {
					...fadeUp,
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						],
						delay: .12
					},
					className: "rounded-3xl overflow-hidden flex flex-col",
					style: {
						background: "#0d1b38",
						boxShadow: "0 8px 48px -12px rgba(13,27,56,0.3)"
					},
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "px-7 py-7",
							style: { borderBottom: "1px solid rgba(255,255,255,0.07)" },
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-black text-white mb-1",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("enquiries_page.contact_heading")
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-white/35",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Available 6 days a week — we respond fast."
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-7 flex-1",
							children: [
								{
									Icon: Mail,
									label: t("enquiries_page.contact_email_label"),
									value: t("enquiries_page.contact_email"),
									accent: "#60a5fa"
								},
								{
									Icon: Phone,
									label: t("enquiries_page.contact_phone_label"),
									value: t("enquiries_page.contact_phone"),
									accent: "#34d399"
								},
								{
									Icon: MapPin,
									label: t("enquiries_page.contact_location_label"),
									value: t("enquiries_page.contact_location"),
									accent: "#fbbf24"
								},
								{
									Icon: Clock,
									label: t("enquiries_page.contact_hours_label"),
									value: t("enquiries_page.contact_hours"),
									accent: "#a78bfa"
								}
							].map(({ Icon, label, value, accent }) => /* @__PURE__ */ jsx(ContactRow, {
								Icon,
								label,
								value,
								accent
							}, label))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-7 py-6",
							style: { borderTop: "1px solid rgba(255,255,255,0.07)" },
							children: [/* @__PURE__ */ jsxs(motion.a, {
								href: "https://wa.me/2348012345678",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center justify-between w-full pl-5 pr-2 py-2 rounded-full cursor-pointer",
								style: {
									background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
									boxShadow: "0 8px 24px -6px rgba(22,163,74,0.4)"
								},
								whileHover: { scale: 1.03 },
								whileTap: { scale: .97 },
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 28
								},
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-white" }), /* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-white",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: "Chat on WhatsApp"
									})]
								}), /* @__PURE__ */ jsx("span", {
									className: "w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-white" })
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-2 mt-5",
								children: [
									{
										Icon: InstagramIcon,
										href: "https://instagram.com",
										label: "Instagram"
									},
									{
										Icon: XIcon,
										href: "https://twitter.com",
										label: "X (Twitter)"
									},
									{
										Icon: FacebookIcon,
										href: "https://facebook.com",
										label: "Facebook"
									}
								].map(({ Icon, href, label }) => /* @__PURE__ */ jsx("a", {
									href,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": label,
									className: "flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200",
									style: {
										background: "rgba(255,255,255,0.07)",
										border: "1px solid rgba(255,255,255,0.1)",
										color: "rgba(255,255,255,0.5)"
									},
									onMouseEnter: (e) => {
										e.currentTarget.style.background = "rgba(255,255,255,0.12)";
									},
									onMouseLeave: (e) => {
										e.currentTarget.style.background = "rgba(255,255,255,0.07)";
									},
									children: /* @__PURE__ */ jsx(Icon, {
										size: 15,
										color: "currentColor"
									})
								}, href))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-7 py-6",
							style: {
								borderTop: "1px solid rgba(255,255,255,0.07)",
								background: "rgba(255,255,255,0.025)"
							},
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "Popular Routes"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: POPULAR_ROUTES.map((r) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold",
									style: {
										fontFamily: "Satoshi, sans-serif",
										background: "rgba(74,144,217,0.12)",
										color: "#93c5fd",
										border: "1px solid rgba(74,144,217,0.22)"
									},
									children: [/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-current opacity-60" }), r]
								}, r))
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto",
				children: /* @__PURE__ */ jsx(FaqSection, {
					items: FAQS.map(({ q, a }) => ({
						q,
						a
					})),
					image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&auto=format&fit=crop&q=85",
					eyebrow: "FAQ",
					heading: "Questions about your trip?",
					sub: "Everything you need to know before you book — answered clearly, without jargon."
				})
			})
		})
	] });
}
var common_default = {
	nav: {
		"home": "Home",
		"services": "Services",
		"destinations": "Destinations",
		"our_story": "Our Story",
		"reviews": "Reviews",
		"enquiries": "Enquiries",
		"team": "Our Team",
		"book": "Book a Trip"
	},
	hero: {
		"label": "Next Route Travels",
		"heading_line1": "We Plan the Route.",
		"heading_line2": "You Enjoy the Journey.",
		"sub": "From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions.",
		"cta_primary": "Explore Destinations",
		"cta_secondary": "Our Story",
		"eyebrow": "Lagos · London · New York · Dubai",
		"explore": "Explore destinations",
		"pause": "Pause tour",
		"resume": "Resume tour",
		"cta_label": "Next Route Travels",
		"cta_how": "How would you like to travel?",
		"cta_confirmation": "Manual confirmation · within 24h",
		"cta_no_booking": "No automated booking. A travel specialist confirms your options within 24 hours.",
		"cta_send": "Send Enquiry",
		"cta_whatsapp": "Or reach us on WhatsApp →",
		"cta_iata": "IATA Accredited",
		"cta_support": "24/7 specialist support",
		"cta_price": "Best price promise",
		"flight_label": "Flights",
		"flight_note": "Nigeria to the world",
		"road_label": "Road Travel",
		"road_note": "West Africa routes",
		"expedition_label": "Expeditions",
		"expedition_note": "Latin America & beyond"
	},
	home_services: {
		"eyebrow": "What We Do",
		"heading": "Every Route, Handled.",
		"flights_title": "Flights",
		"flights_body": "Connecting Nigeria to major international hubs. Whether you are traveling for business, study, or leisure, we bridge the gap between Nigeria and the rest of the world with reliable flight options and seamless booking coordination.",
		"road_title": "Road Travel",
		"road_body": "Inter-state express services and private charters across West Africa. Experience safe, comfortable, and reliable regional transit. From interstate commuting within Nigeria to private cross-border charters, we keep you moving smoothly.",
		"latam_title": "Latin America Expeditions",
		"latam_body": "Specialized SUV and road travel connecting North & South America. Discover tailored, rugged, and breathtaking overland journeys across spectacular Latin American landscapes with experienced guides and specialized vehicles.",
		"learn_more": "Learn more"
	},
	home_destinations: {
		"heading": "Destination Guides & Local Insights",
		"sub": "Travel like a local, no matter where you land. Explore our curated insights to prepare for your next big journey.",
		"view_all": "View All Destinations",
		"rome_subtitle": "Ancient History Meets Modern Charm",
		"rome_body": "Discover the eternal city. From navigating historic cobblestone streets to finding the most authentic local culinary secrets, our Rome guide offers essential insights for African travelers exploring Italy.",
		"serengeti_subtitle": "The Ultimate African Wildlife Experience",
		"serengeti_body": "Witness nature in its rawest form. Our Serengeti guide prepares you for unforgettable safari expeditions, tracking the great migration, and respecting the local ecosystem.",
		"greek_subtitle": "Sun, Sea, and Timeless Architecture",
		"greek_body": "Escape to the breathtaking Mediterranean coast. Learn the best ways to island-hop across Greece, discover hidden beaches, and find the perfect coastal accommodations.",
		"read_guide": "Read guide"
	},
	home_about: {
		"eyebrow": "Our Mission",
		"heading": "The Message Behind Next Route Travels",
		"body1": "At Next Route Travels, we believe that travel is more than just moving from one geographical point to another — it is about bridging worlds, expanding horizons, and creating unforgettable stories.",
		"body2": "Our mission is to eliminate the stress of travel planning by offering clear, reliable, and accessible information for both regional commutes and massive international expeditions. We don't just connect roads and flight paths; we connect people to their next great opportunity.",
		"cta": "Read Our Story"
	},
	home_features: {
		"heading": "What Next Route Travels Does For You",
		"nav_title": "Navigating Global Routes",
		"nav_body": "We provide up-to-date transit insights, helping travelers from Nigeria understand international flight connections, layovers, and travel requirements without the confusion.",
		"regional_title": "Regional Connectivity",
		"regional_body": "We champion West African unity by detailing safe, structured road travel paths, offering a trusted resource for regional commerce, family visits, and tourism.",
		"adventure_title": "Curated Adventure Planning",
		"adventure_body": "For those looking to step far outside their comfort zone — like exploring Latin America by road — we provide the specialized knowledge, vehicle insights, and structural blueprints needed.",
		"cultural_title": "Local Cultural Insights",
		"cultural_body": "We believe in respectful, informed travel. Our destination guides ensure that before you even pack your bags, you understand the local culture, accommodation landscapes, and hidden gems."
	},
	cta_banner: {
		"heading1": "Your Next Adventure",
		"heading2": "Starts",
		"accent": "Here.",
		"sub": "Tell us where you want to go — we'll take care of everything else.",
		"book": "Book a Trip",
		"explore": "Explore Services"
	},
	services_page: {
		"eyebrow": "What We Offer",
		"heading": "Every Journey, Expertly Handled.",
		"sub": "From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure.",
		"flights_eyebrow": "International Air Travel",
		"flights_heading": "Flights From Nigeria to the World",
		"flights_body1": "We connect Lagos and Abuja to the major international hubs your journey demands. Whether it is a business trip to London, a study placement in Canada, or a holiday escape to Dubai — we coordinate reliable, well-routed flights with minimal layover stress.",
		"flights_body2": "Our flight coordination covers route research, booking guidance, and pre-departure support so you always know exactly what to expect before you board.",
		"popular_routes": "Popular Routes",
		"road_eyebrow": "West African Road Travel",
		"road_heading": "Reliable Road Routes Across West Africa",
		"road_body1": "Not every journey requires a flight. Our inter-state and cross-border road travel service covers the most important Nigerian corridors and West African highways — with safety and comfort as non-negotiables.",
		"road_body2": "From express Lagos–Abuja runs to private charters deep into Accra or Cotonou, we provide structured schedules, vetted drivers, and real-time coordination so your road trip feels less like a gamble and more like a plan.",
		"road_feature1": "Group bookings for any size",
		"road_feature2": "Vetted, professional drivers",
		"road_feature3": "Schedule coordination & tracking",
		"road_feature4": "Door-to-door routing available",
		"latam_eyebrow": "Latin America Expeditions",
		"latam_heading": "Overland Adventures Across the Americas",
		"latam_body1": "Latin America is one of the world's most spectacular road destinations — and we've built specialized expedition packages to match. Our SUV overland journeys traverse diverse terrains, crossing borders and cultures with expert support every mile.",
		"latam_body2": "Each expedition is fully structured: pre-trip briefings, vetted local guides, accommodation arrangements, and safety protocols — so you focus entirely on the experience.",
		"duration": "Duration",
		"includes": "Includes",
		"enquire_trip": "Enquire About This Trip"
	},
	destinations_page: {
		"eyebrow": "Where We Go",
		"heading": "Destinations We Cover",
		"sub": "Every destination we feature is one we know intimately — with curated guides to help you travel smarter.",
		"search_placeholder": "Search destinations...",
		"filter_all": "All",
		"filter_africa": "Africa",
		"filter_europe": "Europe",
		"filter_middle_east": "Middle East",
		"filter_americas": "Americas",
		"no_results": "No destinations found.",
		"explore": "Explore",
		"rome_subtitle": "Ancient History Meets Modern Charm",
		"rome_body": "Discover the eternal city. From navigating historic cobblestone streets to finding the most authentic local culinary secrets, our Rome guide offers essential insights for African travelers exploring Italy.",
		"serengeti_subtitle": "The Ultimate African Wildlife Experience",
		"serengeti_body": "Witness nature in its rawest form. Our Serengeti guide prepares you for unforgettable safari expeditions, tracking the great migration, and respecting the local ecosystem.",
		"greek_subtitle": "Sun, Sea, and Timeless Architecture",
		"greek_body": "Escape to the breathtaking Mediterranean coast. Learn the best ways to island-hop across Greece, discover hidden beaches, and find the perfect coastal accommodations.",
		"dubai_subtitle": "Where Luxury Meets the Desert",
		"dubai_body": "Experience the city of gold — from towering skyscrapers to ancient souks. Dubai is the ultimate layover destination upgraded to a full adventure.",
		"london_subtitle": "The Gateway to Europe",
		"london_body": "Navigate London like a local — from the Tube to hidden Borough markets, our guide helps Nigerian travelers make the most of their UK stopover or extended stay.",
		"new_york_subtitle": "The City That Never Sleeps",
		"new_york_body": "New York is overwhelming in the best possible way. Our guide cuts through the noise — boroughs, transit, neighborhoods, and the spots that matter most for first-time visitors from Nigeria.",
		"colombia_subtitle": "Where the Andes Meet the Caribbean",
		"colombia_body": "Medellín, Cartagena, the coffee region — Colombia is a revelation. Our guide helps you navigate safety, culture, and the best overland routes across this diverse nation.",
		"guide_eyebrow": "Travel Intelligence",
		"guide_heading": "More Than Just a Map",
		"guide_body1": "Our destination guides aren't built from generic travel blogs. They're informed by real routes, real travelers from Nigeria, and real challenges — visa requirements, currency exchanges, cultural norms, and more.",
		"guide_body2": "We update them regularly so the information you rely on is always current.",
		"coming_soon_heading": "More Destinations Coming Soon",
		"coming_soon_body": "We're constantly expanding. If your destination isn't listed yet, get in touch — we can still help you plan."
	},
	our_story_page: {
		"eyebrow": "Our Story",
		"heading": "We Started Because Travel Shouldn't Be",
		"heading_accent": "This Hard.",
		"sub": "Born out of frustration and fueled by passion — Next Route Travels exists because every Nigerian deserves to see the world, without the headache.",
		"mission_quote": "Travel should feel like freedom, not paperwork.",
		"mission_quote_sub": "From the streets of Lagos to the skylines of New York, we believe every journey should be the beginning of something extraordinary.",
		"mission_eyebrow": "The Mission",
		"mission_heading": "The Message Behind Next Route Travels",
		"mission_body1": "At Next Route Travels, we believe that travel is more than just moving from one geographical point to another — it is about bridging worlds, expanding horizons, and creating unforgettable stories.",
		"mission_body2": "Our mission is to eliminate the stress of travel planning by offering clear, reliable, and accessible information for both regional commutes and massive international expeditions. We don't just connect roads and flight paths; we connect people to their next great opportunity.",
		"mission_body3": "Driven by reliability, safety, and a passion for exploration, we are here to guide your path every step of the way.",
		"values_heading": "What We Stand For",
		"value_reliability_name": "Reliability",
		"value_reliability_body": "We eliminate the stress of travel planning by offering clear, accessible, and structured insights. No vague timelines, no runaround. Just dependable, honest guidance you can plan around.",
		"value_safety_name": "Safety",
		"value_safety_body": "Every journey we coordinate is planned with safety at the center — vetted partners, verified routes, and responsible travel practices for every single trip we touch.",
		"value_passion_name": "Passion for Exploration",
		"value_passion_body": "We are driven by a genuine love for discovery. Whether it's Lagos to London or Colombia to Patagonia, we pour that passion into every trip, every guide, every route we plan.",
		"what_we_do_eyebrow": "What We Do",
		"what_we_do_heading": "A Premier Travel Platform",
		"what_we_do_body1": "Next Route Travels is a premier travel information and messaging platform dedicated to providing reliable journeys across Nigeria and beyond by connecting people, cultures, and destinations through seamless air travel, cross-border road adventures, and curated international expeditions.",
		"what_we_do_body2": "Our mission is to eliminate the stress of travel planning by offering clear, accessible, and structured insights, whether you are looking for international flights connecting Nigeria to major global hubs, safe and comfortable inter-state express services and private charters across West Africa, or specialized SUV overland expeditions through the spectacular landscapes of North and South America.",
		"what_we_do_body3": "Beyond regional transit and global connectivity, the platform serves as a comprehensive travel companion featuring curated destination guides and local insights for iconic locations like Rome, the Serengeti, and the Greek Islands, helping travelers understand cultural nuances, find ideal accommodations, and discover hidden gems before they even pack their bags.",
		"brand_quote": "We're not just a travel platform. We're the reason you finally said yes to that trip.",
		"brand_cta": "Start Planning Your Trip"
	},
	enquiries_page: {
		"eyebrow": "Get In Touch",
		"heading": "Plan Your Next Journey",
		"sub": "Tell us where you want to go, and we'll handle the rest. Fill in the form and our team will be in touch within 24 hours.",
		"form_name": "Full Name",
		"form_name_placeholder": "Your full name",
		"form_email": "Email Address",
		"form_email_placeholder": "your@email.com",
		"form_phone": "Phone Number",
		"form_phone_placeholder": "+234 800 000 0000",
		"form_service": "Service Type",
		"form_service_placeholder": "Select a service",
		"form_service_flight": "International Flight",
		"form_service_road": "Road Travel",
		"form_service_latam": "Latin America Expedition",
		"form_service_other": "Other / General Enquiry",
		"form_destination": "Destination",
		"form_destination_placeholder": "Where do you want to go?",
		"form_date": "Preferred Travel Date",
		"form_passengers": "Number of Passengers",
		"form_passengers_placeholder": "1",
		"form_message": "Additional Details",
		"form_message_placeholder": "Any other details about your trip, requirements, or questions...",
		"form_submit": "Send Enquiry",
		"form_submitting": "Sending...",
		"form_success_heading": "Enquiry Received!",
		"form_success_body": "Thank you for reaching out. Our team will review your request and get back to you within 24 hours.",
		"form_success_new": "Submit Another Enquiry",
		"contact_heading": "Other Ways to Reach Us",
		"contact_email_label": "Email",
		"contact_email": "hello@nextroutetravels.com",
		"contact_phone_label": "Phone",
		"contact_phone": "+234 800 NEXT ROUTE",
		"contact_location_label": "Location",
		"contact_location": "Lagos, Nigeria",
		"contact_hours_label": "Hours",
		"contact_hours": "Mon–Fri, 9am–6pm WAT"
	},
	locations_globe: {
		"label": "Our routes",
		"heading": "Where we fly & drive",
		"body": "From our hub in Lagos, we connect travellers to iconic destinations across Africa, Europe, the Middle East, and beyond.",
		"cities": "Cities",
		"countries": "Countries",
		"continents": "Continents",
		"flight": "Flight",
		"road_travel": "Road Travel",
		"expedition": "Expedition",
		"europe": "Europe",
		"middle_east": "Middle East",
		"americas": "Americas",
		"africa": "Africa",
		"asia": "Asia"
	},
	destination_detail: {
		"back": "Destinations",
		"about_eyebrow": "About",
		"plan_cta": "Plan My {{name}} Trip",
		"highlights_eyebrow": "What To Do",
		"highlights_heading": "{{name}} Highlights",
		"gallery_label": "Gallery",
		"gallery_title": "{{name}} in Pictures",
		"gallery_desc": "Drag to explore. Click to expand. Every photo is a reason to go.",
		"cta_heading": "Ready to visit {{name}}?",
		"cta_body": "Tell us your travel dates and we'll build a personalised {{name}} itinerary within 24 hours.",
		"cta_button": "Enquire About {{name}}",
		"info_flight": "Flight Time",
		"info_season": "Best Season",
		"info_currency": "Currency",
		"info_language": "Language",
		"info_timezone": "Timezone",
		"info_visa": "Visa",
		"reviews_count": "{{count}} reviews",
		"trip_glance": "Trip at a Glance"
	},
	reviews_page: {
		"eyebrow": "Verified Reviews",
		"heading_line1": "Travellers Trust",
		"heading_accent": "Next Route",
		"sub": "340+ verified reviews from real travellers across Africa, Europe, the Middle East and the Americas.",
		"stat_rating": "Average Rating",
		"stat_reviews": "Verified Reviews",
		"stat_recommend": "Would Recommend",
		"form_heading": "Share Your Experience",
		"form_sub": "Your review helps other travellers",
		"form_rating_label": "Your Rating *",
		"form_name_label": "Full Name *",
		"form_name_placeholder": "e.g. Adaeze Okonkwo",
		"form_destination_label": "Destination Visited",
		"form_destination_placeholder": "e.g. Dubai, UAE",
		"form_review_label": "Your Review *",
		"form_review_placeholder": "Tell us about your experience with Next Route Travels...",
		"form_submit": "Submit Review",
		"form_success_heading": "Thank you, {{name}}!",
		"form_success_body": "Your review has been submitted and will appear once verified.",
		"form_close": "Close",
		"cta_heading": "Ready to travel?",
		"cta_sub": "Get a free trip quote today",
		"mobile_btn": "Leave a Review",
		"tag_flight": "Flight",
		"tag_package": "Package",
		"tag_romance": "Romance",
		"tag_safari": "Safari",
		"tag_group": "Group",
		"tag_corporate": "Corporate"
	},
	footer: {
		"tagline": "Connecting Nigeria to the world — one route at a time.",
		"explore_col": "Explore",
		"company_col": "Company",
		"services_col": "Services",
		"destinations_col": "Destinations",
		"legal_col": "Legal",
		"privacy": "Privacy Policy",
		"terms": "Terms of Service",
		"flights": "Flights",
		"road_travel_link": "Road Travel",
		"expeditions": "Expeditions",
		"rome": "Rome",
		"serengeti": "Serengeti",
		"greek_islands": "Greek Islands",
		"newsletter_placeholder": "Join our travel newsletter...",
		"newsletter_success": "✓ You're on the list. Safe travels!",
		"copyright": "© {{year}} Next Route Travels. All rights reserved."
	},
	team_page: {
		"eyebrow": "The People",
		"heading_line1": "Built by Travellers,",
		"heading_accent": "For Travellers.",
		"sub": "A Lagos-based team passionate about making world-class travel genuinely accessible for every African explorer.",
		"stat_years": "Years Experience",
		"stat_countries": "Countries Covered",
		"stat_clients": "Happy Clients",
		"stat_specialists": "Specialists",
		"featured_badge": "Founder & CEO",
		"grid_eyebrow": "The Team",
		"grid_heading": "Specialists, Not Generalists.",
		"values_eyebrow": "How We Work",
		"values_heading": "Three Things We Never Compromise On.",
		"val1_title": "Precision Planning",
		"val1_body": "Every itinerary is built around your exact needs — no templates, no off-the-shelf packages. We think in details.",
		"val2_title": "Local Knowledge",
		"val2_body": "Our network of on-the-ground contacts means we know things the internet doesn't. That local edge is our advantage.",
		"val3_title": "Honest Advice",
		"val3_body": "We'll tell you what's worth your budget and what isn't. Our job is to send you somewhere you'll genuinely love.",
		"cta_heading": "Ready to Travel With Us?",
		"cta_sub": "Tell us where you want to go and we'll take care of everything else.",
		"cta_button": "Start an Enquiry"
	}
};
//#endregion
//#region src/entry-server.tsx
async function render(url) {
	const i18n = createInstance();
	await i18n.use(initReactI18next).init({
		lng: "en",
		resources: { en: { common: common_default } },
		interpolation: { escapeValue: false },
		defaultNS: "common",
		ns: ["common"]
	});
	const helmetContext = {};
	return {
		html: renderToString(/* @__PURE__ */ jsx(HelmetProvider, {
			context: helmetContext,
			children: /* @__PURE__ */ jsx(I18nextProvider, {
				i18n,
				children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(StaticRouter, {
					location: url,
					children: [
						/* @__PURE__ */ jsx(Navbar, {}),
						/* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Suspense, {
							fallback: null,
							children: /* @__PURE__ */ jsxs(Routes, { children: [
								/* @__PURE__ */ jsx(Route, {
									path: "/",
									element: /* @__PURE__ */ jsx(HomePage, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/services",
									element: /* @__PURE__ */ jsx(ServicesPage, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/destinations",
									element: /* @__PURE__ */ jsx(DestinationsPage, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/our-story",
									element: /* @__PURE__ */ jsx(OurStoryPage, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/enquiries",
									element: /* @__PURE__ */ jsx(EnquiriesPage, {})
								})
							] })
						}) }),
						/* @__PURE__ */ jsx(Footer, {})
					]
				}) })
			})
		})),
		helmetContext
	};
}
//#endregion
export { render };
