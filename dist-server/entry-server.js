import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import { createInstance } from "i18next";
import * as React from "react";
import { Suspense, createContext, forwardRef, useCallback, useContext, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle, ChevronDown, Clock, Compass, Globe, Heart, Mail, Map, MapPin, Navigation, Phone, Search, Send, Shield, Star, X, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import MapLibreGL from "maplibre-gl";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Accordion from "@radix-ui/react-accordion";
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
var SPRING$1 = {
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
							className: "relative text-green-600 px-3 py-1.5",
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
									transition: SPRING$1,
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
										transition: SPRING$1,
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
					transition: SPRING$1,
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
						transition: SPRING$1,
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
		links: [{
			to: "/our-story",
			labelKey: "nav.our_story"
		}, {
			to: "/enquiries",
			labelKey: "nav.enquiries"
		}]
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
				margin: "-100px"
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
//#region src/components/ui/map.tsx
var defaultStyles = {
	dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
	light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
};
function getDocumentTheme() {
	if (typeof document === "undefined") return null;
	if (document.documentElement.classList.contains("dark")) return "dark";
	if (document.documentElement.classList.contains("light")) return "light";
	return null;
}
function getSystemTheme() {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useResolvedTheme(themeProp) {
	const [detectedTheme, setDetectedTheme] = useState(() => getDocumentTheme() ?? getSystemTheme());
	useEffect(() => {
		if (themeProp) return;
		const observer = new MutationObserver(() => {
			const docTheme = getDocumentTheme();
			if (docTheme) setDetectedTheme(docTheme);
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemChange = (e) => {
			if (!getDocumentTheme()) setDetectedTheme(e.matches ? "dark" : "light");
		};
		mediaQuery.addEventListener("change", handleSystemChange);
		return () => {
			observer.disconnect();
			mediaQuery.removeEventListener("change", handleSystemChange);
		};
	}, [themeProp]);
	return themeProp ?? detectedTheme;
}
var MapContext = createContext(null);
function useMap() {
	const context = useContext(MapContext);
	if (!context) throw new Error("useMap must be used within a Map component");
	return context;
}
function DefaultLoader() {
	return /* @__PURE__ */ jsx("div", {
		className: "bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex gap-1",
			children: [
				/* @__PURE__ */ jsx("span", { className: "bg-muted-foreground/60 size-1.5 animate-pulse rounded-full" }),
				/* @__PURE__ */ jsx("span", { className: "bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:150ms]" }),
				/* @__PURE__ */ jsx("span", { className: "bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:300ms]" })
			]
		})
	});
}
function getViewport(map) {
	const center = map.getCenter();
	return {
		center: [center.lng, center.lat],
		zoom: map.getZoom(),
		bearing: map.getBearing(),
		pitch: map.getPitch()
	};
}
var Map$1 = forwardRef(function Map({ children, className, theme: themeProp, styles, projection, viewport, onViewportChange, loading = false, ...props }, ref) {
	const containerRef = useRef(null);
	const [mapInstance, setMapInstance] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isStyleLoaded, setIsStyleLoaded] = useState(false);
	const currentStyleRef = useRef(null);
	const styleTimeoutRef = useRef(null);
	const internalUpdateRef = useRef(false);
	const resolvedTheme = useResolvedTheme(themeProp);
	const isControlled = viewport !== void 0 && onViewportChange !== void 0;
	const onViewportChangeRef = useRef(onViewportChange);
	onViewportChangeRef.current = onViewportChange;
	const mapStyles = useMemo(() => ({
		dark: styles?.dark ?? defaultStyles.dark,
		light: styles?.light ?? defaultStyles.light
	}), [styles]);
	useImperativeHandle(ref, () => mapInstance, [mapInstance]);
	const clearStyleTimeout = useCallback(() => {
		if (styleTimeoutRef.current) {
			clearTimeout(styleTimeoutRef.current);
			styleTimeoutRef.current = null;
		}
	}, []);
	useEffect(() => {
		if (!containerRef.current) return;
		const initialStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
		currentStyleRef.current = initialStyle;
		const map = new MapLibreGL.Map({
			container: containerRef.current,
			style: initialStyle,
			renderWorldCopies: false,
			attributionControl: { compact: true },
			...props,
			...viewport
		});
		const styleDataHandler = () => {
			clearStyleTimeout();
			styleTimeoutRef.current = setTimeout(() => {
				setIsStyleLoaded(true);
				if (projection) map.setProjection(projection);
			}, 100);
		};
		const loadHandler = () => setIsLoaded(true);
		const handleMove = () => {
			if (internalUpdateRef.current) return;
			onViewportChangeRef.current?.(getViewport(map));
		};
		map.on("load", loadHandler);
		map.on("styledata", styleDataHandler);
		map.on("move", handleMove);
		setMapInstance(map);
		return () => {
			clearStyleTimeout();
			map.off("load", loadHandler);
			map.off("styledata", styleDataHandler);
			map.off("move", handleMove);
			map.remove();
			setIsLoaded(false);
			setIsStyleLoaded(false);
			setMapInstance(null);
		};
	}, []);
	useEffect(() => {
		if (!mapInstance || !isControlled || !viewport) return;
		if (mapInstance.isMoving()) return;
		const current = getViewport(mapInstance);
		const next = {
			center: viewport.center ?? current.center,
			zoom: viewport.zoom ?? current.zoom,
			bearing: viewport.bearing ?? current.bearing,
			pitch: viewport.pitch ?? current.pitch
		};
		if (next.center[0] === current.center[0] && next.center[1] === current.center[1] && next.zoom === current.zoom && next.bearing === current.bearing && next.pitch === current.pitch) return;
		internalUpdateRef.current = true;
		mapInstance.jumpTo(next);
		internalUpdateRef.current = false;
	}, [
		mapInstance,
		isControlled,
		viewport
	]);
	useEffect(() => {
		if (!mapInstance || !resolvedTheme) return;
		const newStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
		if (currentStyleRef.current === newStyle) return;
		clearStyleTimeout();
		currentStyleRef.current = newStyle;
		setIsStyleLoaded(false);
		mapInstance.setStyle(newStyle, { diff: true });
	}, [
		mapInstance,
		resolvedTheme,
		mapStyles,
		clearStyleTimeout
	]);
	const contextValue = useMemo(() => ({
		map: mapInstance,
		isLoaded: isLoaded && isStyleLoaded
	}), [
		mapInstance,
		isLoaded,
		isStyleLoaded
	]);
	return /* @__PURE__ */ jsx(MapContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsxs("div", {
			ref: containerRef,
			className: cn("relative h-full w-full", className),
			children: [(!isLoaded || loading) && /* @__PURE__ */ jsx(DefaultLoader, {}), mapInstance && children]
		})
	});
});
var MarkerContext = createContext(null);
function useMarkerContext() {
	const context = useContext(MarkerContext);
	if (!context) throw new Error("Marker components must be used within MapMarker");
	return context;
}
function MapMarker({ longitude, latitude, children, onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd, draggable = false, ...markerOptions }) {
	const { map } = useMap();
	const callbacksRef = useRef({
		onClick,
		onMouseEnter,
		onMouseLeave,
		onDragStart,
		onDrag,
		onDragEnd
	});
	callbacksRef.current = {
		onClick,
		onMouseEnter,
		onMouseLeave,
		onDragStart,
		onDrag,
		onDragEnd
	};
	const marker = useMemo(() => {
		const markerInstance = new MapLibreGL.Marker({
			...markerOptions,
			element: document.createElement("div"),
			draggable
		}).setLngLat([longitude, latitude]);
		const handleClick = (e) => callbacksRef.current.onClick?.(e);
		const handleMouseEnter = (e) => callbacksRef.current.onMouseEnter?.(e);
		const handleMouseLeave = (e) => callbacksRef.current.onMouseLeave?.(e);
		markerInstance.getElement()?.addEventListener("click", handleClick);
		markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
		markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);
		const handleDragStart = () => {
			const lngLat = markerInstance.getLngLat();
			callbacksRef.current.onDragStart?.({
				lng: lngLat.lng,
				lat: lngLat.lat
			});
		};
		const handleDrag = () => {
			const lngLat = markerInstance.getLngLat();
			callbacksRef.current.onDrag?.({
				lng: lngLat.lng,
				lat: lngLat.lat
			});
		};
		const handleDragEnd = () => {
			const lngLat = markerInstance.getLngLat();
			callbacksRef.current.onDragEnd?.({
				lng: lngLat.lng,
				lat: lngLat.lat
			});
		};
		markerInstance.on("dragstart", handleDragStart);
		markerInstance.on("drag", handleDrag);
		markerInstance.on("dragend", handleDragEnd);
		return markerInstance;
	}, []);
	useEffect(() => {
		if (!map) return;
		marker.addTo(map);
		return () => {
			marker.remove();
		};
	}, [map]);
	if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) marker.setLngLat([longitude, latitude]);
	if (marker.isDraggable() !== draggable) marker.setDraggable(draggable);
	const currentOffset = marker.getOffset();
	const newOffset = markerOptions.offset ?? [0, 0];
	const [newOffsetX, newOffsetY] = Array.isArray(newOffset) ? newOffset : [newOffset.x, newOffset.y];
	if (currentOffset.x !== newOffsetX || currentOffset.y !== newOffsetY) marker.setOffset(newOffset);
	if (marker.getRotation() !== markerOptions.rotation) marker.setRotation(markerOptions.rotation ?? 0);
	if (marker.getRotationAlignment() !== markerOptions.rotationAlignment) marker.setRotationAlignment(markerOptions.rotationAlignment ?? "auto");
	if (marker.getPitchAlignment() !== markerOptions.pitchAlignment) marker.setPitchAlignment(markerOptions.pitchAlignment ?? "auto");
	return /* @__PURE__ */ jsx(MarkerContext.Provider, {
		value: {
			marker,
			map
		},
		children
	});
}
function MarkerContent({ children, className }) {
	const { marker } = useMarkerContext();
	return createPortal(/* @__PURE__ */ jsx("div", {
		className: cn("relative cursor-pointer", className),
		children: children || /* @__PURE__ */ jsx(DefaultMarkerIcon, {})
	}), marker.getElement());
}
function DefaultMarkerIcon() {
	return /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" });
}
function MarkerLabel({ children, className, position = "top" }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap", "text-foreground text-[10px] font-medium", {
			top: "bottom-full mb-1",
			bottom: "top-full mt-1"
		}[position], className),
		children
	});
}
var DEFAULT_ARC_CURVATURE = .2;
var DEFAULT_ARC_SAMPLES = 64;
var ARC_HIT_MIN_WIDTH = 12;
var ARC_HIT_PADDING = 6;
var DEFAULT_ARC_PAINT = {
	"line-color": "#4285F4",
	"line-width": 2,
	"line-opacity": .85
};
var DEFAULT_ARC_LAYOUT = {
	"line-join": "round",
	"line-cap": "round"
};
function mergeArcPaint(paint, hoverPaint) {
	if (!hoverPaint) return paint;
	const merged = { ...paint };
	for (const [key, hoverValue] of Object.entries(hoverPaint)) {
		if (hoverValue === void 0) continue;
		const baseValue = merged[key];
		merged[key] = baseValue === void 0 ? hoverValue : [
			"case",
			[
				"boolean",
				["feature-state", "hover"],
				false
			],
			hoverValue,
			baseValue
		];
	}
	return merged;
}
function buildArcCoordinates(from, to, curvature, samples) {
	const [x0, y0] = from;
	const [x2, y2] = to;
	const dx = x2 - x0;
	const dy = y2 - y0;
	const distance = Math.hypot(dx, dy);
	if (distance === 0 || curvature === 0) return [from, to];
	const mx = (x0 + x2) / 2;
	const my = (y0 + y2) / 2;
	const nx = -dy / distance;
	const ny = dx / distance;
	const offset = distance * curvature;
	const cx = mx + nx * offset;
	const cy = my + ny * offset;
	const points = [];
	const segments = Math.max(2, Math.floor(samples));
	for (let i = 0; i <= segments; i += 1) {
		const t = i / segments;
		const inv = 1 - t;
		const x = inv * inv * x0 + 2 * inv * t * cx + t * t * x2;
		const y = inv * inv * y0 + 2 * inv * t * cy + t * t * y2;
		points.push([x, y]);
	}
	return points;
}
function MapArc({ data, id: propId, curvature = DEFAULT_ARC_CURVATURE, samples = DEFAULT_ARC_SAMPLES, paint, layout, hoverPaint, onClick, onHover, interactive = true, beforeId }) {
	const { map, isLoaded } = useMap();
	const autoId = useId();
	const id = propId ?? autoId;
	const sourceId = `arc-source-${id}`;
	const layerId = `arc-layer-${id}`;
	const hitLayerId = `arc-hit-layer-${id}`;
	const mergedPaint = useMemo(() => mergeArcPaint({
		...DEFAULT_ARC_PAINT,
		...paint
	}, hoverPaint), [paint, hoverPaint]);
	const mergedLayout = useMemo(() => ({
		...DEFAULT_ARC_LAYOUT,
		...layout
	}), [layout]);
	const hitWidth = useMemo(() => {
		const w = paint?.["line-width"] ?? DEFAULT_ARC_PAINT["line-width"];
		return Math.max((typeof w === "number" ? w : ARC_HIT_MIN_WIDTH) + ARC_HIT_PADDING, ARC_HIT_MIN_WIDTH);
	}, [paint]);
	const geoJSON = useMemo(() => ({
		type: "FeatureCollection",
		features: data.map((arc) => {
			const { from, to, ...properties } = arc;
			return {
				type: "Feature",
				properties,
				geometry: {
					type: "LineString",
					coordinates: buildArcCoordinates(from, to, curvature, samples)
				}
			};
		})
	}), [
		data,
		curvature,
		samples
	]);
	const latestRef = useRef({
		data,
		onClick,
		onHover
	});
	latestRef.current = {
		data,
		onClick,
		onHover
	};
	useEffect(() => {
		if (!isLoaded || !map) return;
		map.addSource(sourceId, {
			type: "geojson",
			data: geoJSON,
			promoteId: "id"
		});
		map.addLayer({
			id: hitLayerId,
			type: "line",
			source: sourceId,
			layout: DEFAULT_ARC_LAYOUT,
			paint: {
				"line-color": "rgba(0, 0, 0, 0)",
				"line-width": hitWidth,
				"line-opacity": 1
			}
		}, beforeId);
		map.addLayer({
			id: layerId,
			type: "line",
			source: sourceId,
			layout: mergedLayout,
			paint: mergedPaint
		}, beforeId);
		return () => {
			try {
				if (map.getLayer(layerId)) map.removeLayer(layerId);
				if (map.getLayer(hitLayerId)) map.removeLayer(hitLayerId);
				if (map.getSource(sourceId)) map.removeSource(sourceId);
			} catch {}
		};
	}, [isLoaded, map]);
	useEffect(() => {
		if (!isLoaded || !map) return;
		map.getSource(sourceId)?.setData(geoJSON);
	}, [
		isLoaded,
		map,
		geoJSON,
		sourceId
	]);
	useEffect(() => {
		if (!isLoaded || !map || !map.getLayer(layerId)) return;
		for (const [key, value] of Object.entries(mergedPaint)) map.setPaintProperty(layerId, key, value);
		for (const [key, value] of Object.entries(mergedLayout)) map.setLayoutProperty(layerId, key, value);
		if (map.getLayer(hitLayerId)) map.setPaintProperty(hitLayerId, "line-width", hitWidth);
	}, [
		isLoaded,
		map,
		layerId,
		hitLayerId,
		mergedPaint,
		mergedLayout,
		hitWidth
	]);
	useEffect(() => {
		if (!isLoaded || !map || !interactive) return;
		let hoveredId = null;
		const setHover = (next) => {
			if (next === hoveredId) return;
			const sourceExists = !!map.getSource(sourceId);
			if (hoveredId != null && sourceExists) map.setFeatureState({
				source: sourceId,
				id: hoveredId
			}, { hover: false });
			hoveredId = next;
			if (next != null && sourceExists) map.setFeatureState({
				source: sourceId,
				id: next
			}, { hover: true });
		};
		const findArc = (featureId) => featureId == null ? void 0 : latestRef.current.data.find((arc) => String(arc.id) === String(featureId));
		const handleMouseMove = (e) => {
			const featureId = e.features?.[0]?.id;
			if (featureId == null || featureId === hoveredId) return;
			setHover(featureId);
			map.getCanvas().style.cursor = "pointer";
			const arc = findArc(featureId);
			if (arc) latestRef.current.onHover?.({
				arc,
				longitude: e.lngLat.lng,
				latitude: e.lngLat.lat,
				originalEvent: e
			});
		};
		const handleMouseLeave = () => {
			setHover(null);
			map.getCanvas().style.cursor = "";
			latestRef.current.onHover?.(null);
		};
		const handleClick = (e) => {
			const arc = findArc(e.features?.[0]?.id);
			if (!arc) return;
			latestRef.current.onClick?.({
				arc,
				longitude: e.lngLat.lng,
				latitude: e.lngLat.lat,
				originalEvent: e
			});
		};
		map.on("mousemove", hitLayerId, handleMouseMove);
		map.on("mouseleave", hitLayerId, handleMouseLeave);
		map.on("click", hitLayerId, handleClick);
		return () => {
			map.off("mousemove", hitLayerId, handleMouseMove);
			map.off("mouseleave", hitLayerId, handleMouseLeave);
			map.off("click", hitLayerId, handleClick);
			setHover(null);
			map.getCanvas().style.cursor = "";
		};
	}, [
		isLoaded,
		map,
		hitLayerId,
		sourceId,
		interactive
	]);
	return null;
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
var ARCS = LOCATIONS.map((loc) => ({
	id: loc.name,
	from: [HUB.lng, HUB.lat],
	to: [loc.lng, loc.lat]
}));
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
function fadeUp$5(delay = 0) {
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
			margin: "-80px"
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
		margin: "-80px"
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
		className: "h-[460px] md:h-[960px] w-full",
		children: /* @__PURE__ */ jsxs(Map$1, {
			center: [HUB.lng, HUB.lat],
			zoom: 1.4,
			projection: { type: "globe" },
			theme: "light",
			interactive: true,
			scrollZoom: false,
			doubleClickZoom: true,
			attributionControl: false,
			children: [
				/* @__PURE__ */ jsx(MapArc, {
					data: ARCS,
					paint: {
						"line-color": "#3b82f6",
						"line-width": 1.5,
						"line-dasharray": [2, 2],
						"line-opacity": .7
					},
					interactive: false
				}),
				/* @__PURE__ */ jsx(MapMarker, {
					longitude: HUB.lng,
					latitude: HUB.lat,
					children: /* @__PURE__ */ jsxs(MarkerContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "size-3.5 rounded-full border-2 border-white",
						style: {
							background: "#f5d27a",
							boxShadow: "0 0 0 4px rgba(245,210,122,0.3), 0 0 10px 2px rgba(245,210,122,0.4)"
						}
					}), /* @__PURE__ */ jsx(MarkerLabel, {
						position: "top",
						className: "text-[#1a2f5a] text-[10px] font-bold tracking-wide",
						children: HUB.name
					})] })
				}),
				LOCATIONS.map((loc) => /* @__PURE__ */ jsx(MapMarker, {
					longitude: loc.lng,
					latitude: loc.lat,
					children: /* @__PURE__ */ jsxs(MarkerContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "size-2 rounded-full border-2 border-white",
						style: { background: "#3b82f6" }
					}), /* @__PURE__ */ jsx(MarkerLabel, {
						position: "top",
						className: "text-[#1a2f5a] text-[9px] font-medium",
						children: loc.city
					})] })
				}, loc.name)),
				EXTRA_DOTS.map((d) => /* @__PURE__ */ jsx(MapMarker, {
					longitude: d.lng,
					latitude: d.lat,
					children: /* @__PURE__ */ jsx(MarkerContent, { children: /* @__PURE__ */ jsx("div", { className: "size-1.5 rounded-full bg-white/15" }) })
				}, d.name))
			]
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
						margin: "-80px"
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
					children: /* @__PURE__ */ jsx("div", {
						className: "rounded-2xl overflow-hidden",
						children: /* @__PURE__ */ jsx(GlobeMap, {})
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-full lg:w-[45%] flex flex-col gap-8",
					children: [
						/* @__PURE__ */ jsx(motion.p, {
							className: "text-[10px] font-bold tracking-[0.32em] uppercase text-white/35",
							style: { fontFamily: "Satoshi, sans-serif" },
							...fadeUp$5(.08),
							children: t("locations_globe.label")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "-mt-4",
							children: [/* @__PURE__ */ jsxs(motion.h2, {
								className: "text-[2.6rem] sm:text-[3.4rem] font-black leading-[0.98] tracking-tight text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								...fadeUp$5(.16),
								children: [t("locations_globe.heading"), /* @__PURE__ */ jsx("span", {
									className: "text-[#a8cce8]",
									children: "."
								})]
							}), /* @__PURE__ */ jsx(motion.p, {
								className: "mt-4 text-[15px] text-white/45 leading-relaxed max-w-sm",
								style: { fontFamily: "Satoshi, sans-serif" },
								...fadeUp$5(.24),
								children: t("locations_globe.body")
							})]
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "relative h-[232px] overflow-hidden rounded-xl",
							style: { maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)" },
							...fadeUp$5(.32),
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
							...fadeUp$5(.42),
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
var SPRING = {
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
							transition: SPRING,
							children: [
								active === s.id && /* @__PURE__ */ jsx(motion.div, {
									layoutId: "journey-service-pill",
									className: "absolute inset-0 rounded-2xl bg-[#0d1b38]",
									transition: SPRING
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
								transition: SPRING,
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
									transition: SPRING,
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
var fadeUp$4 = {
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
		margin: "-60px"
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
var SERVICE_KEYS = [
	{
		Icon: Globe,
		titleKey: "flights_title",
		bodyKey: "flights_body"
	},
	{
		Icon: Map,
		titleKey: "road_title",
		bodyKey: "road_body"
	},
	{
		Icon: Compass,
		titleKey: "latam_title",
		bodyKey: "latam_body"
	}
];
var DEST_CARDS = [
	{
		name: "Rome",
		region: "Italy, Europe",
		subtitleKey: "rome_subtitle",
		bodyKey: "rome_body",
		gradient: "linear-gradient(135deg, #c41e3a 0%, #8b1a2e 100%)"
	},
	{
		name: "Serengeti",
		region: "Tanzania, Africa",
		subtitleKey: "serengeti_subtitle",
		bodyKey: "serengeti_body",
		gradient: "linear-gradient(135deg, #d97706 0%, #92400e 100%)"
	},
	{
		name: "Greek Islands",
		region: "Greece, Europe",
		subtitleKey: "greek_subtitle",
		bodyKey: "greek_body",
		gradient: "linear-gradient(135deg, #0369a1 0%, #075985 100%)"
	}
];
var FEATURE_KEYS = [
	{
		Icon: Navigation,
		titleKey: "nav_title",
		bodyKey: "nav_body"
	},
	{
		Icon: Shield,
		titleKey: "regional_title",
		bodyKey: "regional_body"
	},
	{
		Icon: Compass,
		titleKey: "adventure_title",
		bodyKey: "adventure_body"
	},
	{
		Icon: BookOpen,
		titleKey: "cultural_title",
		bodyKey: "cultural_body"
	}
];
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
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "text-center mb-16",
					...fadeUp$4,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 mb-6",
						children: [/* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5 text-blue-500" }), /* @__PURE__ */ jsx("span", {
							className: "text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("home_services.eyebrow")
						})]
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("home_services.heading")
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: SERVICE_KEYS.map(({ Icon, titleKey, bodyKey }, i) => /* @__PURE__ */ jsx(motion.div, {
						...fadeUp$4,
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
						whileHover: { y: -2 },
						whileTap: { scale: .98 },
						children: /* @__PURE__ */ jsx(Link, {
							to: "/services",
							className: "group block h-full",
							children: /* @__PURE__ */ jsxs("div", {
								className: "h-full p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-[border-color,box-shadow] duration-300",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-200",
										children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-blue-600" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-bold mb-3 text-[#1a2f5a]",
										style: { fontFamily: "Clash Display, sans-serif" },
										children: t(`home_services.${titleKey}`)
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-slate-500 leading-relaxed",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: t(`home_services.${bodyKey}`)
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-6 flex items-center gap-1 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: [
											t("home_services.learn_more"),
											" ",
											/* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
										]
									})
								]
							})
						})
					}, titleKey))
				})]
			})
		}),
		/* @__PURE__ */ jsx(LocationsGlobe, {}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "text-center mb-16",
						...fadeUp$4,
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-white mb-4",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("home_destinations.heading")
						}), /* @__PURE__ */ jsx("p", {
							className: "text-white/45 max-w-xl mx-auto text-lg",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("home_destinations.sub")
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-6",
						children: DEST_CARDS.map(({ name, region, subtitleKey, bodyKey, gradient }, i) => /* @__PURE__ */ jsx(motion.div, {
							...fadeUp$4,
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
							whileHover: { y: -2 },
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ jsx(Link, {
								to: "/destinations",
								className: "group block h-full",
								children: /* @__PURE__ */ jsxs("div", {
									className: "h-full rounded-2xl overflow-hidden border border-white/08 hover:border-white/15 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "h-36 relative",
										style: { background: gradient },
										children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }), /* @__PURE__ */ jsxs("div", {
											className: "absolute bottom-4 left-5",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-white/60 text-[11px] font-semibold tracking-widest uppercase",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: region
											}), /* @__PURE__ */ jsx("p", {
												className: "text-white text-xl font-black",
												style: { fontFamily: "Clash Display, sans-serif" },
												children: name
											})]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "p-6 bg-[#0f2244]",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-blue-300 text-sm font-semibold mb-2",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t(`home_destinations.${subtitleKey}`)
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-white/50 text-sm leading-relaxed",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t(`home_destinations.${bodyKey}`)
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-5 flex items-center gap-1 text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: [
													t("home_destinations.read_guide"),
													" ",
													/* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
												]
											})
										]
									})]
								})
							})
						}, name))
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "text-center mt-10",
						...fadeUp$4,
						transition: {
							duration: .5,
							delay: .3
						},
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/destinations",
							className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200 backdrop-blur-sm",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [
								t("home_destinations.view_all"),
								" ",
								/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
				children: [/* @__PURE__ */ jsx(motion.div, {
					...fadeUp$4,
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl p-10 border border-blue-100",
						style: { background: "linear-gradient(135deg, #1a2f5a 0%, #0d1b38 100%)" },
						children: [
							/* @__PURE__ */ jsx(Star, { className: "w-8 h-8 text-blue-400 mb-6" }),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "text-2xl md:text-3xl font-black leading-snug text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: [
									"\"",
									t("our_story_page.mission_quote"),
									"\""
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-white/40 text-sm",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "— Next Route Travels"
							})
						]
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
					...fadeUp$4,
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
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 mb-6",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("home_about.eyebrow")
							})
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] mb-6",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("home_about.heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 text-slate-500 leading-relaxed",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [/* @__PURE__ */ jsx("p", { children: t("home_about.body1") }), /* @__PURE__ */ jsx("p", { children: t("home_about.body2") })]
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/our-story",
							className: "mt-8 group inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [
								t("home_about.cta"),
								" ",
								/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "text-center mb-16",
					...fadeUp$4,
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("home_features.heading")
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					children: FEATURE_KEYS.map(({ Icon, titleKey, bodyKey }, i) => /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$4,
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
						className: "p-7 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 group",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mb-5 group-hover:bg-blue-800/60 transition-colors duration-300",
								children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-blue-300" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-base font-bold text-white mb-3",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t(`home_features.${titleKey}`)
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-white/40 leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t(`home_features.${bodyKey}`)
							})
						]
					}, titleKey))
				})]
			})
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
}
//#endregion
//#region src/pages/ServicesPage.tsx
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
		margin: "-60px"
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
var ROAD_FEATURE_KEYS = [
	"road_feature1",
	"road_feature2",
	"road_feature3",
	"road_feature4"
];
var EXPEDITIONS = [
	{
		title: "Colombia → Ecuador Overland",
		duration: "14 days",
		desc: "Cross the Andes from Medellín to Quito, passing cloud forests, volcano corridors, and colonial towns.",
		includes: "SUV, guide, accommodation, meals"
	},
	{
		title: "Patagonia SUV Circuit, Argentina",
		duration: "10 days",
		desc: "Drive the legendary Ruta 40, camp under the stars, and trek Torres del Paine.",
		includes: "SUV, guide, camping gear, permits"
	},
	{
		title: "Peru Sacred Valley & Amazon Loop",
		duration: "12 days",
		desc: "Machu Picchu by road, then descend into the Amazon for a once-in-a-lifetime contrast.",
		includes: "4x4, bilingual guide, flights to Cusco"
	},
	{
		title: "Mexico City → Panama Overland",
		duration: "21 days",
		desc: "The ultimate Central American road epic — six countries, ancient ruins, and Pacific coastlines.",
		includes: "Convoy SUV, support team, hotels, ferry"
	}
];
function RouteTags({ routes }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2 mt-6",
		children: routes.map((r) => /* @__PURE__ */ jsx("span", {
			className: "px-3 py-1 rounded-full text-xs font-semibold border",
			style: {
				fontFamily: "Satoshi, sans-serif",
				borderColor: "rgba(74,144,217,0.3)",
				color: "#4a90d9",
				background: "rgba(74,144,217,0.08)"
			},
			children: r
		}, r))
	});
}
function ServicesPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Travel Services — Next Route Travels",
			description: "From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure.",
			canonicalPath: "/services"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[70vh] flex items-center bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full",
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
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("services_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("services_page.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xl text-white/45 max-w-2xl leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("services_page.sub")
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start",
				children: [/* @__PURE__ */ jsx(motion.div, {
					...fadeUp$3,
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative",
						style: { background: "linear-gradient(135deg, #0d1b38 0%, #1a2f5a 50%, #243a6e 100%)" },
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Globe, {
								className: "w-32 h-32 text-blue-400/20",
								strokeWidth: .8
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative z-10 text-center px-8",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-white/30 text-sm tracking-widest uppercase mb-3",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "International"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white text-4xl font-black",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "Flights"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 flex flex-col gap-2",
									children: FLIGHT_ROUTES.slice(0, 3).map((r) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-center gap-2 text-white/50 text-sm",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" }), r]
									}, r))
								})
							]
						})]
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
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
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-blue-600 text-sm font-bold tracking-widest uppercase",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("services_page.flights_eyebrow")
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("services_page.flights_heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 text-slate-500 leading-relaxed text-lg",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [/* @__PURE__ */ jsx("p", { children: t("services_page.flights_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.flights_body2") })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-3",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("services_page.popular_routes")
						}), /* @__PURE__ */ jsx(RouteTags, { routes: FLIGHT_ROUTES })] }),
						/* @__PURE__ */ jsxs(Link, {
							to: "/enquiries",
							className: "mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]",
							style: {
								fontFamily: "Satoshi, sans-serif",
								background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
								boxShadow: "0 8px 24px rgba(13,27,56,0.25)"
							},
							children: [
								t("services_page.enquire_trip"),
								" ",
								/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-0.5 transition-transform" })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					...fadeUp$3,
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-blue-400 text-sm font-bold tracking-widest uppercase",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: t("services_page.road_eyebrow")
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-white",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("services_page.road_heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 text-white/50 leading-relaxed text-lg",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [/* @__PURE__ */ jsx("p", { children: t("services_page.road_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.road_body2") })]
						}),
						/* @__PURE__ */ jsx(RouteTags, { routes: ROAD_ROUTES }),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: ROAD_FEATURE_KEYS.map((key) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-blue-400 shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-white/55",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t(`services_page.${key}`)
								})]
							}, key))
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/enquiries",
							className: "mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]",
							style: {
								fontFamily: "Satoshi, sans-serif",
								background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
								boxShadow: "0 8px 24px rgba(13,27,56,0.25)"
							},
							children: [
								t("services_page.enquire_trip"),
								" ",
								/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-0.5 transition-transform" })
							]
						})
					]
				}), /* @__PURE__ */ jsx(motion.div, {
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
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative",
						style: { background: "linear-gradient(135deg, #0f2244 0%, #162d55 50%, #1a3566 100%)" },
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 flex items-center justify-center opacity-10",
							children: /* @__PURE__ */ jsx(Map, {
								className: "w-48 h-48 text-blue-300",
								strokeWidth: .5
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative z-10 text-center px-8",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-white/30 text-sm tracking-widest uppercase mb-3",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: "West Africa"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white text-4xl font-black",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: "Road Travel"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 flex flex-col gap-2",
									children: ROAD_ROUTES.slice(0, 3).map((r) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-center gap-2 text-white/50 text-sm",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" }), r]
									}, r))
								})
							]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14",
					...fadeUp$3,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-blue-600 text-sm font-bold tracking-widest uppercase",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("services_page.latam_eyebrow")
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("services_page.latam_heading")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4 text-slate-500 leading-relaxed text-lg",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: [/* @__PURE__ */ jsx("p", { children: t("services_page.latam_body1") }), /* @__PURE__ */ jsx("p", { children: t("services_page.latam_body2") })]
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/enquiries",
								className: "inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]",
								style: {
									fontFamily: "Satoshi, sans-serif",
									background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
									boxShadow: "0 8px 24px rgba(13,27,56,0.25)"
								},
								children: t("services_page.enquire_trip")
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative",
						style: { background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" },
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 opacity-10 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Compass, {
								className: "w-48 h-48 text-emerald-300",
								strokeWidth: .5
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative z-10 text-center px-8",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-emerald-300/60 text-sm tracking-widest uppercase mb-3",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "North & South America"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-white text-3xl font-black",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: "Overland Expeditions"
							})]
						})]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-5",
					children: EXPEDITIONS.map((pkg, i) => /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$3,
						transition: {
							duration: .65,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: i * .08
						},
						className: "p-7 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-400 group",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between mb-3",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-[#1a2f5a]",
									style: { fontFamily: "Clash Display, sans-serif" },
									children: pkg.title
								}), /* @__PURE__ */ jsx("span", {
									className: "shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: pkg.duration
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-slate-500 leading-relaxed mb-3",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: pkg.desc
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-400",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "font-semibold",
										children: [t("services_page.includes"), ":"]
									}),
									" ",
									pkg.includes
								]
							})
						]
					}, pkg.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
}
//#endregion
//#region src/pages/DestinationsPage.tsx
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
		margin: "-60px"
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
var DESTINATIONS = [
	{
		name: "Rome",
		country: "Italy",
		region: "Europe",
		subtitleKey: "rome_subtitle",
		bodyKey: "rome_body",
		tags: [
			"Culture",
			"History",
			"Food"
		],
		gradient: "linear-gradient(135deg, #c41e3a 0%, #8b1a2e 100%)"
	},
	{
		name: "Serengeti",
		country: "Tanzania",
		region: "Africa",
		subtitleKey: "serengeti_subtitle",
		bodyKey: "serengeti_body",
		tags: [
			"Wildlife",
			"Adventure",
			"Nature"
		],
		gradient: "linear-gradient(135deg, #d97706 0%, #92400e 100%)"
	},
	{
		name: "Greek Islands",
		country: "Greece",
		region: "Europe",
		subtitleKey: "greek_subtitle",
		bodyKey: "greek_body",
		tags: [
			"Romance",
			"Beach",
			"Culture"
		],
		gradient: "linear-gradient(135deg, #0369a1 0%, #075985 100%)"
	},
	{
		name: "Dubai",
		country: "UAE",
		region: "Middle East",
		subtitleKey: "dubai_subtitle",
		bodyKey: "dubai_body",
		tags: [
			"Luxury",
			"Architecture",
			"Shopping"
		],
		gradient: "linear-gradient(135deg, #b45309 0%, #78350f 100%)"
	},
	{
		name: "London",
		country: "United Kingdom",
		region: "Europe",
		subtitleKey: "london_subtitle",
		bodyKey: "london_body",
		tags: [
			"Urban",
			"Culture",
			"History"
		],
		gradient: "linear-gradient(135deg, #1e3a5f 0%, #0f1f3d 100%)"
	},
	{
		name: "New York",
		country: "United States",
		region: "Americas",
		subtitleKey: "new_york_subtitle",
		bodyKey: "new_york_body",
		tags: [
			"Urban",
			"Culture",
			"Food"
		],
		gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
	},
	{
		name: "Cartagena",
		country: "Colombia",
		region: "Americas",
		subtitleKey: "colombia_subtitle",
		bodyKey: "colombia_body",
		tags: [
			"History",
			"Beach",
			"Culture"
		],
		gradient: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)"
	},
	{
		name: "Buenos Aires",
		country: "Argentina",
		region: "Americas",
		subtitleKey: "colombia_subtitle",
		bodyKey: "colombia_body",
		tags: [
			"Food",
			"Dance",
			"Architecture"
		],
		gradient: "linear-gradient(135deg, #0f766e 0%, #065f46 100%)"
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
var TIPS = [
	{
		icon: "🛂",
		title: "Passport Renewal",
		body: "Renew at least 6 months before your travel date."
	},
	{
		icon: "💳",
		title: "Notify Your Bank",
		body: "Inform your bank before travelling internationally."
	},
	{
		icon: "🧳",
		title: "Pack Light",
		body: "Pack 30% less than you think you need."
	},
	{
		icon: "📄",
		title: "Print Bookings",
		body: "Always carry printed copies of all key documents."
	}
];
function DestinationsPage() {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");
	const [region, setRegion] = useState("All");
	const filtered = DESTINATIONS.filter((d) => {
		const matchRegion = region === "All" || d.region === region;
		const matchSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
		return matchRegion && matchSearch;
	});
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Destinations — Next Route Travels",
			description: "Every destination we feature is one we know intimately — Rome, Serengeti, Dubai, London and more, with curated guides to help you travel smarter.",
			canonicalPath: "/destinations"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[60vh] flex items-center bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full",
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
						className: "text-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("destinations_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("destinations_page.heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xl text-white/45 max-w-xl mx-auto mb-10",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("destinations_page.sub")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative max-w-md mx-auto",
								children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" }), /* @__PURE__ */ jsx("input", {
									type: "text",
									placeholder: t("destinations_page.search_placeholder"),
									value: search,
									onChange: (e) => setSearch(e.target.value),
									className: "w-full h-14 rounded-full border border-white/15 bg-white/5 pl-11 pr-6 text-sm text-white placeholder:text-white/30 backdrop-blur-sm outline-none focus:border-blue-400/50 transition-colors",
									style: { fontFamily: "Satoshi, sans-serif" }
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto",
				children: /* @__PURE__ */ jsx(motion.div, {
					...fadeUp$2,
					children: /* @__PURE__ */ jsx(Link, {
						to: "/destinations",
						className: "group block",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative rounded-3xl overflow-hidden h-80 md:h-96",
							style: { background: "linear-gradient(135deg, #d97706 0%, #92400e 50%, #78350f 100%)" },
							children: [
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" }),
								/* @__PURE__ */ jsx("div", {
									"aria-hidden": true,
									className: "absolute inset-0 opacity-[0.06]",
									style: {
										backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
										backgroundSize: "28px 28px"
									}
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative z-10 h-full flex flex-col justify-end p-10",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsxs("div", { children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 mb-3",
												children: [/* @__PURE__ */ jsx("span", {
													className: "px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-sm",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: "Featured"
												}), /* @__PURE__ */ jsx("span", {
													className: "px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 backdrop-blur-sm",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: "Africa"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-white/60 text-sm font-semibold mb-1",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: "Tanzania, Africa"
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-4xl md:text-5xl font-black text-white",
												style: { fontFamily: "Clash Display, sans-serif" },
												children: "Serengeti"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 text-white/70 text-lg",
												style: { fontFamily: "Satoshi, sans-serif" },
												children: t("destinations_page.serengeti_subtitle")
											})
										] }), /* @__PURE__ */ jsx("div", {
											className: "shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300",
											children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-white" })
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "mt-6 flex flex-wrap gap-2",
										children: [
											"Wildlife",
											"Adventure",
											"Nature",
											"Safari"
										].map((tag) => /* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 backdrop-blur-sm",
											style: { fontFamily: "Satoshi, sans-serif" },
											children: tag
										}, tag))
									})]
								})
							]
						})
					})
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ jsx(motion.div, {
						...fadeUp$2,
						className: "flex flex-wrap gap-2 mb-10",
						children: REGION_KEYS.map(({ value, key }) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setRegion(value),
							className: "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
							style: {
								fontFamily: "Satoshi, sans-serif",
								background: region === value ? "#1a2f5a" : "transparent",
								color: region === value ? "#fff" : "inherit",
								border: region === value ? "1px solid transparent" : "1px solid rgba(26,47,90,0.2)"
							},
							children: t(`destinations_page.${key}`)
						}, value))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: /* @__PURE__ */ jsx(AnimatePresence, {
							mode: "popLayout",
							children: filtered.map((dest) => /* @__PURE__ */ jsx(motion.div, {
								layout: true,
								initial: {
									opacity: 0,
									scale: .97
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: {
									opacity: 0,
									scale: .97
								},
								transition: {
									duration: .3,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								children: /* @__PURE__ */ jsx(Link, {
									to: "/destinations",
									className: "group block h-full",
									children: /* @__PURE__ */ jsxs("div", {
										className: "h-full rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "h-40 relative",
											style: { background: dest.gradient },
											children: [
												/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
												/* @__PURE__ */ jsx("div", {
													className: "absolute top-4 right-4",
													children: /* @__PURE__ */ jsx("span", {
														className: "px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm",
														style: { fontFamily: "Satoshi, sans-serif" },
														children: dest.region
													})
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "absolute bottom-4 left-5 flex items-center gap-1.5",
													children: [/* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-white/60" }), /* @__PURE__ */ jsx("p", {
														className: "text-white/60 text-xs font-semibold",
														style: { fontFamily: "Satoshi, sans-serif" },
														children: dest.country
													})]
												}),
												/* @__PURE__ */ jsx("div", {
													className: "absolute bottom-4 left-5 top-auto",
													children: /* @__PURE__ */ jsx("p", {
														className: "text-white text-2xl font-black mt-5",
														style: { fontFamily: "Clash Display, sans-serif" },
														children: dest.name
													})
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "p-6",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-blue-600 text-xs font-bold mb-2",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: t(`destinations_page.${dest.subtitleKey}`)
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-sm text-slate-500 leading-relaxed mb-4",
													style: { fontFamily: "Satoshi, sans-serif" },
													children: t(`destinations_page.${dest.bodyKey}`)
												}),
												/* @__PURE__ */ jsx("div", {
													className: "flex flex-wrap gap-1.5",
													children: dest.tags.map((tag) => /* @__PURE__ */ jsx("span", {
														className: "px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500",
														style: { fontFamily: "Satoshi, sans-serif" },
														children: tag
													}, tag))
												})
											]
										})]
									})
								})
							}, dest.name))
						})
					}),
					filtered.length === 0 && /* @__PURE__ */ jsx("div", {
						className: "text-center py-20",
						children: /* @__PURE__ */ jsxs("p", {
							className: "text-slate-400 text-lg",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [
								t("destinations_page.no_results"),
								" \"",
								search,
								"\""
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "text-center mb-14",
					...fadeUp$2,
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: "Smart Traveller Tips"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					children: TIPS.map(({ icon, title, body }, i) => /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$2,
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
						className: "p-7 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-3xl mb-5",
								children: icon
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
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
}
//#endregion
//#region src/pages/OurStoryPage.tsx
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
		margin: "-60px"
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
var VALUE_KEYS = [
	{
		Icon: Zap,
		nameKey: "value_reliability_name",
		bodyKey: "value_reliability_body"
	},
	{
		Icon: Shield,
		nameKey: "value_safety_name",
		bodyKey: "value_safety_body"
	},
	{
		Icon: Heart,
		nameKey: "value_passion_name",
		bodyKey: "value_passion_body"
	}
];
function OurStoryPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(SEOHead, {
			title: "Our Story — Next Route Travels",
			description: "Learn about the people and purpose behind Next Route Travels — a Lagos-based agency built to make world-class travel accessible across Africa and beyond.",
			canonicalPath: "/our-story"
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[75vh] flex items-center bg-[#0d1b38] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/12 blur-[120px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" }),
				/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute inset-0 opacity-[0.02] pointer-events-none",
					style: {
						backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
						backgroundSize: "64px 64px"
					}
				}),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full",
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
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("our_story_page.eyebrow")
								})]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: [
									t("our_story_page.heading"),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsxs("em", {
										className: "not-italic",
										style: {
											background: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
											backgroundClip: "text"
										},
										children: [" ", t("our_story_page.heading_accent")]
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xl text-white/45 max-w-2xl leading-relaxed",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("our_story_page.sub")
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
				children: [/* @__PURE__ */ jsx(motion.div, {
					...fadeUp$1,
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl p-10 border border-blue-100",
						style: { background: "linear-gradient(135deg, #0d1b38 0%, #1a2f5a 100%)" },
						children: [
							/* @__PURE__ */ jsx(Compass, { className: "w-8 h-8 text-blue-400 mb-6" }),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "text-2xl md:text-3xl font-black leading-snug text-white",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: [
									"\"",
									t("our_story_page.mission_quote"),
									"\""
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-8 pt-8 border-t border-white/10",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-white/40 text-sm leading-relaxed",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: t("our_story_page.mission_quote_sub")
								})
							})
						]
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
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
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("our_story_page.mission_eyebrow")
							})
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("our_story_page.mission_heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 text-slate-500 leading-relaxed",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.mission_body1") }),
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.mission_body2") }),
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.mission_body3") })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#0d1b38]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "text-center mb-16",
					...fadeUp$1,
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-white",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("our_story_page.values_heading")
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: VALUE_KEYS.map(({ Icon, nameKey, bodyKey }, i) => /* @__PURE__ */ jsxs(motion.div, {
						...fadeUp$1,
						transition: {
							duration: .65,
							ease: [
								.22,
								1,
								.36,
								1
							],
							delay: i * .12
						},
						className: "p-8 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-xl bg-blue-900/50 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-blue-300" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-black text-white mb-4",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t(`our_story_page.${nameKey}`)
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/45 leading-relaxed text-sm",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t(`our_story_page.${bodyKey}`)
							})
						]
					}, nameKey))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-28 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-3xl mx-auto",
				children: /* @__PURE__ */ jsxs(motion.div, {
					...fadeUp$1,
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("our_story_page.what_we_do_eyebrow")
							})
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
							style: { fontFamily: "Clash Display, sans-serif" },
							children: t("our_story_page.what_we_do_heading")
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 text-slate-500 leading-loose text-lg",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: [
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.what_we_do_body1") }),
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.what_we_do_body2") }),
								/* @__PURE__ */ jsx("p", { children: t("our_story_page.what_we_do_body3") })
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs(motion.div, {
				...fadeUp$1,
				className: "max-w-3xl mx-auto text-center space-y-8",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-3xl md:text-4xl font-black text-[#1a2f5a] leading-snug",
					style: { fontFamily: "Clash Display, sans-serif" },
					children: [
						"\"",
						t("our_story_page.brand_quote"),
						"\""
					]
				}), /* @__PURE__ */ jsxs(Link, {
					to: "/enquiries",
					className: "group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]",
					style: {
						fontFamily: "Satoshi, sans-serif",
						background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
						boxShadow: "0 8px 32px rgba(13,27,56,0.3)"
					},
					children: [t("our_story_page.brand_cta"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-0.5 transition-transform" })]
				})]
			})
		}),
		/* @__PURE__ */ jsx(CTABanner, {})
	] });
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
		margin: "-60px"
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
function EnquiryForm() {
	const { t } = useTranslation();
	const [submitted, setSubmitted] = useState(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
	const onSubmit = () => setSubmitted(true);
	const fieldClass = (hasError) => `w-full h-12 rounded-xl border px-4 text-sm bg-white text-[#1a2f5a] placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-blue-500/30 ${hasError ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-blue-400"}`;
	if (submitted) return /* @__PURE__ */ jsxs(motion.div, {
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
		className: "flex flex-col items-center justify-center text-center py-20 space-y-5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "w-16 h-16 rounded-full bg-green-50 flex items-center justify-center",
				children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-green-500" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl font-black text-[#1a2f5a]",
				style: { fontFamily: "Clash Display, sans-serif" },
				children: t("enquiries_page.form_success_heading")
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-slate-500 max-w-sm",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t("enquiries_page.form_success_body")
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setSubmitted(false),
				className: "text-sm font-semibold text-blue-600 hover:underline cursor-pointer",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t("enquiries_page.form_success_new")
			})
		]
	});
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit(onSubmit),
		className: "space-y-5",
		noValidate: true,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_name"), " *"]
					}),
					/* @__PURE__ */ jsx("input", {
						...register("fullName"),
						placeholder: t("enquiries_page.form_name_placeholder"),
						className: fieldClass(!!errors.fullName),
						style: { fontFamily: "Satoshi, sans-serif" }
					}),
					errors.fullName && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.fullName.message
					})
				] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_email"), " *"]
					}),
					/* @__PURE__ */ jsx("input", {
						...register("email"),
						type: "email",
						placeholder: t("enquiries_page.form_email_placeholder"),
						className: fieldClass(!!errors.email),
						style: { fontFamily: "Satoshi, sans-serif" }
					}),
					errors.email && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.email.message
					})
				] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_phone"), " *"]
					}),
					/* @__PURE__ */ jsx("input", {
						...register("phone"),
						type: "tel",
						placeholder: t("enquiries_page.form_phone_placeholder"),
						className: fieldClass(!!errors.phone),
						style: { fontFamily: "Satoshi, sans-serif" }
					}),
					errors.phone && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.phone.message
					})
				] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_service"), " *"]
					}),
					/* @__PURE__ */ jsxs("select", {
						...register("serviceType"),
						defaultValue: "",
						className: `${fieldClass(!!errors.serviceType)} cursor-pointer`,
						style: { fontFamily: "Satoshi, sans-serif" },
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
					}),
					errors.serviceType && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.serviceType.message
					})
				] })]
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("label", {
					className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
					style: { fontFamily: "Satoshi, sans-serif" },
					children: [t("enquiries_page.form_destination"), " *"]
				}),
				/* @__PURE__ */ jsx("input", {
					...register("destination"),
					placeholder: t("enquiries_page.form_destination_placeholder"),
					className: fieldClass(!!errors.destination),
					style: { fontFamily: "Satoshi, sans-serif" }
				}),
				errors.destination && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-red-500",
					style: { fontFamily: "Satoshi, sans-serif" },
					children: errors.destination.message
				})
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_date"), " *"]
					}),
					/* @__PURE__ */ jsx("input", {
						...register("preferredDate"),
						type: "date",
						className: fieldClass(!!errors.preferredDate),
						style: { fontFamily: "Satoshi, sans-serif" }
					}),
					errors.preferredDate && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.preferredDate.message
					})
				] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: [t("enquiries_page.form_passengers"), " *"]
					}),
					/* @__PURE__ */ jsx("input", {
						...register("travellers"),
						type: "number",
						min: 1,
						placeholder: t("enquiries_page.form_passengers_placeholder"),
						className: fieldClass(!!errors.travellers),
						style: { fontFamily: "Satoshi, sans-serif" }
					}),
					errors.travellers && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-red-500",
						style: { fontFamily: "Satoshi, sans-serif" },
						children: errors.travellers.message
					})
				] })]
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				className: "block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase",
				style: { fontFamily: "Satoshi, sans-serif" },
				children: t("enquiries_page.form_message")
			}), /* @__PURE__ */ jsx("textarea", {
				...register("message"),
				rows: 4,
				placeholder: t("enquiries_page.form_message_placeholder"),
				className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white text-[#1a2f5a] placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 resize-none",
				style: { fontFamily: "Satoshi, sans-serif" }
			})] }),
			/* @__PURE__ */ jsxs("button", {
				type: "submit",
				className: "w-full h-14 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-xl",
				style: {
					fontFamily: "Satoshi, sans-serif",
					background: "linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)",
					boxShadow: "0 4px 20px rgba(13,27,56,0.25)"
				},
				children: [t("enquiries_page.form_submit"), " →"]
			})
		]
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
			children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" }), /* @__PURE__ */ jsx("div", {
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
							className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6",
							children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" }), /* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: t("enquiries_page.eyebrow")
							})]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5",
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
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-[#f5f8fc]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					...fadeUp,
					className: "bg-white rounded-2xl p-8 md:p-10 border border-slate-100",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-black text-[#1a2f5a] mb-8",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: t("enquiries_page.heading")
					}), /* @__PURE__ */ jsx(EnquiryForm, {})]
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
						delay: .15
					},
					className: "space-y-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-8 border border-slate-100 shadow-sm",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-black text-[#1a2f5a] mb-2",
								style: { fontFamily: "Clash Display, sans-serif" },
								children: t("enquiries_page.contact_heading")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-slate-500 mb-7",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: "We're available 6 days a week and respond fast."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-5",
								children: [
									{
										Icon: Mail,
										label: t("enquiries_page.contact_email_label"),
										value: t("enquiries_page.contact_email")
									},
									{
										Icon: Phone,
										label: t("enquiries_page.contact_phone_label"),
										value: t("enquiries_page.contact_phone")
									},
									{
										Icon: MapPin,
										label: t("enquiries_page.contact_location_label"),
										value: t("enquiries_page.contact_location")
									},
									{
										Icon: Clock,
										label: t("enquiries_page.contact_hours_label"),
										value: t("enquiries_page.contact_hours")
									}
								].map(({ Icon, label, value }) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-blue-600" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-0.5",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: label
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-slate-600 whitespace-pre-line",
										style: { fontFamily: "Satoshi, sans-serif" },
										children: value
									})] })]
								}, label))
							}),
							/* @__PURE__ */ jsx("a", {
								href: "https://wa.me/2348012345678",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-8 w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg",
								style: {
									fontFamily: "Satoshi, sans-serif",
									background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
									boxShadow: "0 4px 16px rgba(22,163,74,0.25)"
								},
								children: "Chat on WhatsApp"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-6 flex items-center gap-2",
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
									className: "flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-foreground hover:border-slate-300 transition-colors duration-200",
									children: /* @__PURE__ */ jsx(Icon, { size: 16 })
								}, href))
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-[#0d1b38] rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4",
							style: { fontFamily: "Satoshi, sans-serif" },
							children: "Popular Routes"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: [
								"Lagos → London",
								"Lagos → Dubai",
								"Abuja → New York",
								"Lagos → Accra"
							].map((r) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-white/55",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: r
								})]
							}, r))
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 px-6 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "text-center mb-12",
					...fadeUp,
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]",
						style: { fontFamily: "Clash Display, sans-serif" },
						children: "Frequently Asked Questions"
					})
				}), /* @__PURE__ */ jsx(motion.div, {
					...fadeUp,
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						],
						delay: .1
					},
					children: /* @__PURE__ */ jsx(Accordion.Root, {
						type: "single",
						collapsible: true,
						className: "space-y-3",
						children: FAQS.map(({ q, a }, i) => /* @__PURE__ */ jsxs(Accordion.Item, {
							value: `item-${i}`,
							className: "rounded-xl border border-slate-100 bg-white overflow-hidden",
							children: [/* @__PURE__ */ jsxs(Accordion.Trigger, {
								className: "group flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer",
								style: { fontFamily: "Satoshi, sans-serif" },
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-[#1a2f5a] pr-4",
									children: q
								}), /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" })]
							}), /* @__PURE__ */ jsx(Accordion.Content, {
								className: "overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease] data-[state=closed]:animate-[accordion-up_0.2s_ease]",
								children: /* @__PURE__ */ jsx("p", {
									className: "px-6 pb-5 text-sm text-slate-500 leading-relaxed",
									style: { fontFamily: "Satoshi, sans-serif" },
									children: a
								})
							})]
						}, i))
					})
				})]
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
		"enquiries": "Enquiries",
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
