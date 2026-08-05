var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T;
import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, Link, Outlet, useSearchParams, useLoaderData, useParams, Navigate } from "react-router-dom";
import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, ChevronLeft, ChevronRight, RotateCcw, Move, ZoomIn, Pause, Play, ChevronDown, ChevronUp, Check, FileText, KeyRound, LogOut, ArrowUp, ArrowDown, Upload, Save, Heading2, Heading3, Bold, Italic, List, ListOrdered, Link as Link$2, Unlink, Undo2, Redo2, ArrowLeft, Send, EyeOff, Eye, CircleDashed, CheckCircle2, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2, toast as toast$1 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import useEmblaCarousel from "embla-carousel-react";
import DOMPurify from "dompurify";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Slot } from "@radix-ui/react-slot";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link$1 from "@tiptap/extension-link";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/lib/ssr-polyfill.ts");
const createMemoryStorage = () => {
  const store = /* @__PURE__ */ new Map();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.has(key) ? store.get(key) : null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => store.delete(key),
    setItem: (key, value) => void store.set(key, String(value))
  };
};
const g = globalThis;
if (typeof g.localStorage === "undefined") g.localStorage = createMemoryStorage();
if (typeof g.sessionStorage === "undefined") g.sessionStorage = createMemoryStorage();
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/hooks/use-toast.ts");
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners$1 = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners$1.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners$1.push(setState);
    return () => {
      const index = listeners$1.indexOf(setState);
      if (index > -1) {
        listeners$1.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/lib/utils.ts");
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const LOVABLE_ASSET_ORIGIN = "https://dennisgerrits.lovable.app";
function lovableAssetUrl(path) {
  return path.startsWith("/__l5e/assets-v1/") ? `${LOVABLE_ASSET_ORIGIN}${path}` : path;
}
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/components/ui/toast.tsx");
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/components/ui/toaster.tsx");
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/components/ui/sonner.tsx");
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
(_g = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _g.call(globalThis, "src/components/ui/tooltip.tsx");
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const dennisIllustration = "/assets/dennis_illustration-CLpQaiBV.png";
(_h = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _h.call(globalThis, "src/components/Header.tsx");
const navLinks = [
  { to: "/#about", label: "About Me" },
  { to: "/#how-it-works", label: "How I Work" },
  { to: "/#rick-steves", label: "Rick Steves" },
  { to: "/get-inspired", label: "Experiences" },
  { to: "/#podcast", label: "Podcast" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#contact", label: "Contact" },
  { to: "/notebook", label: "Notebook" }
];
const secondaryLinks = [
  { to: "/travel-agents", label: "For Professionals" }
];
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavClick = (e, to) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (location.pathname === "/") {
        scrollToId(id);
      } else {
        navigate("/");
        setTimeout(() => scrollToId(id), 80);
      }
    }
  };
  const handleLogoClick = (e) => {
    setOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between py-3 sm:py-4 px-5 sm:px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", onClick: handleLogoClick, className: "flex items-center gap-2 sm:gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: dennisIllustration,
            alt: "Dennis Gerrits logo",
            className: "h-12 w-12 sm:h-16 sm:w-16 object-contain -my-2 sm:-my-4 shrink-0",
            style: {
              filter: "brightness(0) saturate(100%) invert(36%) sepia(89%) saturate(2876%) hue-rotate(7deg) brightness(95%) contrast(105%)"
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-heading text-xl sm:text-2xl tracking-wider text-primary truncate", children: "Dennis Gerrits" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
        navLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.to,
            onClick: (e) => handleNavClick(e, link.to),
            className: cn(
              "font-body text-sm tracking-wide transition-colors hover:text-secondary",
              location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
            ),
            children: link.label
          },
          link.to
        )),
        /* @__PURE__ */ jsx("span", { className: "h-4 w-px bg-border/60", "aria-hidden": true }),
        secondaryLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.to,
            onClick: (e) => handleNavClick(e, link.to),
            className: cn(
              "font-body text-xs tracking-[0.15em] uppercase transition-colors hover:text-secondary",
              location.pathname === link.to ? "text-secondary" : "text-foreground/40"
            ),
            children: link.label
          },
          link.to
        ))
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden p-2 text-foreground",
          onClick: () => setOpen(!open),
          "aria-label": "Toggle menu",
          children: open ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxs("nav", { className: "md:hidden border-t border-border/40 bg-background px-6 pb-6 pt-4 space-y-4", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.to,
          onClick: (e) => handleNavClick(e, link.to),
          className: cn(
            "block font-body text-lg py-2 transition-colors",
            location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
          ),
          children: link.label
        },
        link.to
      )),
      /* @__PURE__ */ jsx("div", { className: "pt-3 mt-3 border-t border-border/40", children: secondaryLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.to,
          onClick: (e) => handleNavClick(e, link.to),
          className: "block font-body text-sm tracking-[0.15em] uppercase py-2 text-foreground/50 hover:text-secondary transition-colors",
          children: link.label
        },
        link.to
      )) })
    ] })
  ] });
};
(_i = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _i.call(globalThis, "src/components/Footer.tsx");
const exploreLinks = [
  { to: "/#about", label: "About Me" },
  { to: "/#how-it-works", label: "How I Work" },
  { to: "/#rick-steves", label: "Rick Steves" },
  { to: "/get-inspired", label: "Experiences" },
  { to: "/#podcast", label: "Podcast" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#contact", label: "Contact" },
  { to: "/notebook", label: "Notebook" }
];
const proLinks = [
  { to: "/travel-agents", label: "For Travel Advisors & Concierges" }
];
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (e, to) => {
    if (to === "#") return;
    const scrollToId2 = (id) => {
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        if (attempts < 20) {
          requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };
      tryScroll();
    };
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (location.pathname === "/") scrollToId2(id);
      else {
        navigate("/");
        setTimeout(() => scrollToId2(id), 50);
      }
      return;
    }
    if (to.includes("#")) {
      const [path, id] = to.split("#");
      if (location.pathname === path) {
        e.preventDefault();
        scrollToId2(id);
      }
    }
  };
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border/40 bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12 py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl mb-3", children: "Dennis Gerrits" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-primary-foreground/80 text-sm tracking-wide mb-4", children: "Storyteller, Host & Travel Companion" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-primary-foreground/60 text-xs leading-relaxed max-w-xs", children: "Formerly Love My City Tours – now dennisgerrits.com." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-heading text-xl mb-4", children: "Explore" }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: exploreLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.to,
          onClick: (e) => handleClick(e, link.to),
          className: "block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors",
          children: link.label
        },
        link.label
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-heading text-xl mb-4", children: "For Professionals" }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: proLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.to,
          onClick: (e) => handleClick(e, link.to),
          className: "block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors",
          children: link.label
        },
        link.label
      )) }),
      /* @__PURE__ */ jsxs("p", { className: "font-body text-primary-foreground/40 text-xs mt-8", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Dennis Gerrits. All rights reserved."
      ] })
    ] })
  ] }) }) });
};
(_j = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _j.call(globalThis, "src/components/FloatingCTA.tsx");
const WHATSAPP_NUMBER = "31638402919";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const WhatsAppIcon = ({ size: size2 = 18 }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size2,
    height: size2,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    focusable: "false",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.470 0 1.45 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z" }),
      /* @__PURE__ */ jsx("path", { d: "M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.83 9.83 0 0 0 4.69 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.17.83.85-3.1-.2-.32a8.16 8.16 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.25-8.15 8.25Z" })
    ]
  }
);
const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (dismissed || !visible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-primary text-primary-foreground rounded-full shadow-lg font-body text-sm tracking-wide overflow-hidden", children: [
    WHATSAPP_URL ? /* @__PURE__ */ jsxs(
      "a",
      {
        href: WHATSAPP_URL,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-3 px-5 py-3 hover:bg-primary/90 transition-colors",
        children: [
          /* @__PURE__ */ jsx(WhatsAppIcon, {}),
          "Get in Touch"
        ]
      }
    ) : /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#contact",
        className: "flex items-center gap-3 px-5 py-3 hover:bg-primary/90 transition-colors",
        onClick: (e) => {
          const el = document.getElementById("contact");
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
          }
        },
        children: [
          /* @__PURE__ */ jsx(WhatsAppIcon, {}),
          "Get in Touch"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setDismissed(true),
        className: "flex items-center justify-center w-10 h-10 mr-1 rounded-full hover:bg-primary-foreground/10 transition-colors",
        "aria-label": "Dismiss",
        children: /* @__PURE__ */ jsx(X, { size: 14 })
      }
    )
  ] }) });
};
(_k = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _k.call(globalThis, "src/components/MovedBanner.tsx");
const STORAGE_KEY$1 = "moved-banner-dismissed-v1";
const MovedBanner = () => {
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY$1) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);
  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY$1, "1");
    } catch {
    }
    setDismissed(true);
  };
  if (dismissed) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      className: "relative border-b",
      style: {
        backgroundColor: "hsl(40 38% 96%)",
        borderColor: "hsl(var(--heritage-taupe) / 0.4)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-6 lg:px-12 py-2.5 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "font-body text-xs sm:text-sm leading-snug",
            style: { color: "hsl(var(--heritage-bordeaux))" },
            children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "mr-2 inline-block", children: "↪" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Formerly Love My City Tours" }),
              /* @__PURE__ */ jsx("span", { className: "opacity-70", children: " – now dennisgerrits.com. Same Dennis, same Amsterdam, new home." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: dismiss,
            "aria-label": "Dismiss banner",
            className: "shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors",
            style: { color: "hsl(var(--heritage-bordeaux))" },
            children: /* @__PURE__ */ jsx(X, { size: 14 })
          }
        )
      ] })
    }
  );
};
(_l = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _l.call(globalThis, "src/Layout.tsx");
const Layout = () => {
  const [queryClient] = useState(() => new QueryClient());
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(MovedBanner, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {})
  ] }) });
};
(_m = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _m.call(globalThis, "src/components/FadeIn.tsx");
const FadeIn = ({ children, className, delay = 0 }) => /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: "easeOut" },
    className,
    children
  }
);
const skyline = "/assets/amsterdam-skyline-ChOQxoLV.png";
(_n = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _n.call(globalThis, "src/hooks/useSkylineProgress.ts");
function useSkylineProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
        rafRef.current = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return progress;
}
(_o = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _o.call(globalThis, "src/components/AmsterdamSkyline.tsx");
const MASK = "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)";
const AmsterdamSkyline = ({ variant = "global" }) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
  if (variant === "section") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        style: { zIndex: 0, clipPath, isolation: "isolate" },
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: skyline,
            alt: "",
            className: "absolute inset-0 w-full h-full block",
            style: {
              opacity: 0.07,
              objectFit: "cover",
              objectPosition: "bottom",
              filter: "brightness(1.5) sepia(1) saturate(6) hue-rotate(-15deg)",
              mixBlendMode: "screen"
            }
          }
        )
      }
    );
  }
  if (variant === "section-light") {
    const fadeMask = "linear-gradient(to bottom, transparent 0%, black 70%, black 100%)";
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        style: { zIndex: 0, clipPath },
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: skyline,
            alt: "",
            className: "absolute inset-x-0 bottom-0 w-full block",
            style: {
              opacity: 0.07,
              objectFit: "contain",
              objectPosition: "bottom",
              maskImage: fadeMask,
              WebkitMaskImage: fadeMask,
              filter: "invert(1) brightness(1.2) sepia(1) saturate(6) hue-rotate(-15deg)",
              mixBlendMode: "multiply"
            }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed bottom-0 left-0 w-full pointer-events-none",
        style: { zIndex: 0, clipPath },
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: skyline,
            alt: "Amsterdam skyline illustration",
            className: "w-full h-auto block",
            style: {
              opacity: 0.02,
              maskImage: MASK,
              WebkitMaskImage: MASK,
              filter: "invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)",
              mixBlendMode: "multiply"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed bottom-0 left-0 w-full pointer-events-none",
        style: { zIndex: 5, clipPath, mixBlendMode: "screen" },
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: skyline,
            alt: "",
            className: "w-full h-auto block",
            style: {
              opacity: 0.05,
              maskImage: MASK,
              WebkitMaskImage: MASK,
              filter: "brightness(1.3) sepia(1) saturate(6) hue-rotate(-15deg)"
            }
          }
        )
      }
    )
  ] });
};
(_p = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _p.call(globalThis, "src/components/StoryBook.tsx");
const StoryBook = ({ stories, initialStoryId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (initialStoryId) {
      const idx = stories.findIndex((s) => s.id === initialStoryId);
      if (idx >= 0) setCurrentPage(idx);
    }
  }, [initialStoryId, stories]);
  const goTo = useCallback(
    (page) => {
      if (page < 0 || page >= stories.length) return;
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
      setTocOpen(false);
    },
    [currentPage, stories.length]
  );
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goTo(currentPage + 1);
      else if (e.key === "ArrowLeft") goTo(currentPage - 1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(stories.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, stories.length, goTo]);
  const story = stories[currentPage];
  if (!story) return null;
  const leftPageNumber = currentPage * 2 + 12;
  const rightPageNumber = leftPageNumber + 1;
  const variants = {
    enter: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? 24 : -24,
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? -24 : 24,
      opacity: 0
    })
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "absolute -bottom-6 left-[6%] right-[6%] h-10 rounded-[50%] blur-2xl opacity-40",
        style: { backgroundColor: "hsl(var(--heritage-dark))" }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative mx-auto max-w-4xl",
        style: { transform: "rotate(-1.1deg)" },
        role: "group",
        "aria-roledescription": "book",
        "aria-label": "Notes from the city, a notebook of short stories",
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute -inset-3 md:-inset-4 rounded-[6px]",
              style: {
                background: "linear-gradient(135deg, hsl(var(--heritage-taupe)) 0%, hsl(var(--heritage-taupe-soft)) 50%, hsl(var(--heritage-taupe)) 100%)",
                boxShadow: "inset 0 0 0 1px hsl(var(--heritage-bordeaux) / 0.25), inset 0 0 30px hsl(var(--heritage-dark) / 0.15), 0 18px 40px -18px hsl(var(--heritage-dark) / 0.45)"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "absolute inset-0 opacity-[0.18] rounded-[6px]",
                    style: {
                      backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--heritage-dark) / 0.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, hsl(var(--heritage-dark) / 0.06) 0 1px, transparent 1px 3px)"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "absolute top-1 left-1/2 -translate-x-1/2 text-[10px] md:text-xs tracking-[0.4em] uppercase font-body",
                    style: { color: "hsl(var(--heritage-orange))" },
                    "aria-hidden": true,
                    children: "Notes from the City · D.G."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -top-1.5 left-3 right-3 h-1.5 rounded-t-sm",
              style: {
                background: "repeating-linear-gradient(90deg, hsl(40 30% 96%) 0 2px, hsl(35 22% 88%) 2px 3px)"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -bottom-1.5 left-3 right-3 h-1.5 rounded-b-sm",
              style: {
                background: "repeating-linear-gradient(90deg, hsl(40 30% 96%) 0 2px, hsl(35 22% 86%) 2px 3px)"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setTocOpen((v) => !v),
              "aria-label": tocOpen ? "Close table of contents" : "Open table of contents",
              className: "absolute -top-3 right-10 md:right-16 z-20 group",
              style: { width: "22px" },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "relative",
                  style: {
                    width: "22px",
                    height: `${72 + currentPage / Math.max(1, stories.length - 1) * 60}px`,
                    transition: "height 400ms ease-out",
                    backgroundColor: "hsl(var(--heritage-bordeaux))",
                    boxShadow: "1px 0 2px hsl(var(--heritage-dark) / 0.3), inset -2px 0 0 hsl(var(--heritage-dark) / 0.2)",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative grid grid-cols-1 md:grid-cols-2 rounded-[3px] overflow-hidden min-h-[520px] md:min-h-[560px]",
              style: {
                background: "linear-gradient(135deg, hsl(40 30% 96%), hsl(35 25% 93%))",
                boxShadow: "inset 0 0 80px hsl(30 20% 80% / 0.5), 0 2px 0 hsl(0 0% 100% / 0.6)"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "hidden md:block absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 pointer-events-none z-10",
                    style: {
                      background: "linear-gradient(90deg, transparent, hsl(var(--heritage-dark) / 0.18) 50%, transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "absolute inset-0 pointer-events-none opacity-[0.05]",
                    style: {
                      backgroundImage: "repeating-linear-gradient(0deg, transparent 0 31px, hsl(0 0% 30%) 31px 32px)",
                      backgroundPosition: "0 90px"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    custom: direction,
                    variants,
                    initial: "enter",
                    animate: "center",
                    exit: "exit",
                    transition: { duration: reduceMotion ? 0.2 : 0.55, ease: [0.4, 0, 0.2, 1] },
                    className: "contents",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col", children: [
                        /* @__PURE__ */ jsxs(
                          "p",
                          {
                            className: "text-base mb-6 -rotate-[2deg]",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              color: "hsl(var(--heritage-bordeaux))"
                            },
                            children: [
                              "chapter ",
                              currentPage + 1
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.05] mb-6", children: story.title }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "h-px flex-1",
                              style: { backgroundColor: "hsl(var(--heritage-bordeaux) / 0.3)" }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "text-sm",
                              style: { color: "hsl(var(--heritage-orange))" },
                              children: "✦"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "h-px flex-1",
                              style: { backgroundColor: "hsl(var(--heritage-bordeaux) / 0.3)" }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "font-body text-base md:text-lg italic leading-relaxed text-foreground/85 flex-1", children: story.intro }),
                        /* @__PURE__ */ jsx(
                          "p",
                          {
                            className: "text-xs tracking-widest mt-8 self-start",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              fontSize: "1rem",
                              color: "hsl(var(--heritage-bordeaux) / 0.6)"
                            },
                            "aria-hidden": true,
                            children: leftPageNumber
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "relative p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col border-t md:border-t-0 md:border-l border-foreground/5", children: [
                        /* @__PURE__ */ jsx("p", { className: "font-body text-base md:text-[17px] text-foreground/85 leading-[1.85] flex-1 first-letter:font-heading first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9] first-letter:text-primary", children: story.body }),
                        /* @__PURE__ */ jsx(
                          "p",
                          {
                            className: "text-xl md:text-2xl mt-6 self-end -rotate-[4deg]",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              color: "hsl(var(--heritage-bordeaux))"
                            },
                            "aria-hidden": true,
                            children: "– D."
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "p",
                          {
                            className: "text-xs tracking-widest mt-2 self-end",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              fontSize: "1rem",
                              color: "hsl(var(--heritage-bordeaux) / 0.6)"
                            },
                            "aria-hidden": true,
                            children: rightPageNumber
                          }
                        )
                      ] })
                    ]
                  },
                  currentPage
                ) }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: tocOpen && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.2 },
                    className: "absolute inset-0 z-20 flex items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "hidden md:block w-1/2",
                          style: { backgroundColor: "transparent" },
                          onClick: () => setTocOpen(false)
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "w-full md:w-1/2 p-8 md:p-10 lg:p-14 overflow-y-auto",
                          style: {
                            background: "linear-gradient(135deg, hsl(40 30% 96%), hsl(35 25% 93%))"
                          },
                          children: [
                            /* @__PURE__ */ jsx(
                              "p",
                              {
                                className: "text-base mb-6 -rotate-[2deg]",
                                style: {
                                  fontFamily: "'Caveat', cursive",
                                  color: "hsl(var(--heritage-bordeaux))"
                                },
                                children: "contents"
                              }
                            ),
                            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: stories.map((s, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                              "button",
                              {
                                onClick: () => goTo(i),
                                className: cn(
                                  "text-left font-body w-full transition-colors",
                                  i === currentPage ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
                                ),
                                children: [
                                  /* @__PURE__ */ jsx(
                                    "span",
                                    {
                                      className: "inline-block w-8 text-xs tracking-widest",
                                      style: { color: "hsl(var(--heritage-orange))" },
                                      children: String(i + 1).padStart(2, "0")
                                    }
                                  ),
                                  /* @__PURE__ */ jsx("span", { className: "text-base md:text-lg", children: s.title })
                                ]
                              }
                            ) }, s.id)) })
                          ]
                        }
                      )
                    ]
                  }
                ) }),
                currentPage < stories.length - 1 && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => goTo(currentPage + 1),
                    "aria-label": "Turn to next story",
                    className: "group absolute bottom-0 right-0 z-30",
                    style: { width: "72px", height: "72px" },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "absolute inset-0 transition-transform duration-300 group-hover:scale-110",
                          style: {
                            background: "linear-gradient(135deg, transparent 50%, hsl(35 22% 86%) 50%, hsl(30 18% 78%) 100%)",
                            boxShadow: "-3px -3px 6px hsl(var(--heritage-dark) / 0.12)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "absolute bottom-1.5 right-1.5 text-sm font-medium",
                          style: { color: "hsl(var(--heritage-bordeaux))" },
                          children: "→"
                        }
                      )
                    ]
                  }
                ),
                currentPage > 0 && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => goTo(currentPage - 1),
                    "aria-label": "Turn to previous story",
                    className: "group absolute bottom-0 left-0 z-30",
                    style: { width: "56px", height: "56px" },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "absolute inset-0 transition-transform duration-300 group-hover:scale-110",
                          style: {
                            background: "linear-gradient(225deg, transparent 50%, hsl(35 22% 90%) 50%, hsl(30 18% 84%) 100%)",
                            boxShadow: "3px -3px 6px hsl(var(--heritage-dark) / 0.1)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "absolute bottom-1.5 left-1.5 text-sm font-medium",
                          style: { color: "hsl(var(--heritage-bordeaux))" },
                          children: "←"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-4xl mx-auto mt-6 px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      currentPage > 0 ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => goTo(currentPage - 1),
          className: "group inline-flex items-center gap-2 font-body text-sm transition-colors hover:text-secondary",
          style: { color: "hsl(var(--heritage-bordeaux))" },
          children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "←" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Previous story" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Previous" })
          ]
        }
      ) : /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsxs(
        "p",
        {
          className: "font-body text-xs tracking-widest uppercase",
          style: { color: "hsl(var(--muted-foreground))" },
          children: [
            "Story ",
            currentPage + 1,
            " of ",
            stories.length
          ]
        }
      ),
      currentPage < stories.length - 1 ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => goTo(currentPage + 1),
          className: "group inline-flex items-center gap-2 font-body text-sm transition-colors hover:text-secondary",
          style: { color: "hsl(var(--heritage-bordeaux))" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Next story" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Next" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
          ]
        }
      ) : /* @__PURE__ */ jsx("span", {})
    ] }) })
  ] });
};
(_q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _q.call(globalThis, "src/integrations/supabase/client.ts");
const SUPABASE_URL$1 = "https://tfxqzsgxkkccvpgennmc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeHF6c2d4a2tjY3ZwZ2Vubm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTAyNDYsImV4cCI6MjA5MzQ4NjI0Nn0.mnr-T-skWACJAdgJPJkVtmGGYhLhybS5jvI4PFRku9M";
const supabase = createClient(SUPABASE_URL$1, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});
const iconFoot = "/assets/icon-foot-KDQDekRC.png";
const iconBoat = "/assets/icon-boat-CVTol9O9.png";
const iconFood = "/assets/icon-food-JkA0XvMQ.png";
const iconNature = "/assets/icon-nature-CruQTq0A.png";
const iconDining = "/assets/icon-dining-YvkVI_Z8.png";
const amsterdamMap = "/assets/amsterdam-map-C2zVQ8HP.jpg";
(_r = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _r.call(globalThis, "src/components/DayMap.tsx");
const stops = [
  { x: 110, y: 205, label: "Neighborhood", icon: iconFoot },
  { x: 235, y: 235, label: "Local Cafe", icon: iconBoat },
  { x: 340, y: 215, label: "Hidden Garden", icon: iconFood },
  { x: 470, y: 235, label: "Streets and Canals", icon: iconNature },
  { x: 430, y: 75, label: "Private Boat", icon: iconDining }
];
const pathSegments = [
  "M 110 205 C 155 230, 195 245, 235 235",
  "M 235 235 C 270 220, 305 210, 340 215",
  "M 340 215 C 380 230, 425 235, 470 235",
  "M 470 235 C 480 180, 460 115, 430 75"
];
const PATH_LEN = 240;
const sketchCircle = (cx, cy, r, jitter = 0.6) => {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = i / 12 * Math.PI * 2;
    const rr = r + (Math.sin(i * 1.7) * jitter + Math.cos(i * 2.3) * jitter);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i <= pts.length; i++) {
    const p = pts[i % pts.length];
    d += ` L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  }
  return d + " Z";
};
const DayMap = ({ moments: moments2 }) => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState(/* @__PURE__ */ new Set([0]));
  const sectionRef = useRef(null);
  const handleSelect = useCallback((idx) => {
    setActive(idx);
    setVisited((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  }, []);
  const goPrev = () => handleSelect(Math.max(0, active - 1));
  const goNext = () => handleSelect(Math.min(moments2.length - 1, active + 1));
  const maxVisited = useMemo(() => {
    let max = 0;
    visited.forEach((v) => {
      if (v > max) max = v;
    });
    return max;
  }, [visited]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: sectionRef,
      className: "grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center",
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative w-full",
            style: { aspectRatio: "6 / 4", overflow: "visible" },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: amsterdamMap,
                  alt: "Hand-drawn illustrated map of central Amsterdam showing the canal belt, Centraal Station, Westerkerk, Vondelpark, Rijksmuseum and the Amstel river.",
                  width: 1536,
                  height: 1024,
                  loading: "lazy",
                  decoding: "async",
                  className: "absolute inset-0 w-full h-full object-cover rounded-sm shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]"
                }
              ),
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  viewBox: "0 0 600 400",
                  className: "relative w-full h-full",
                  style: { overflow: "visible" },
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "sketch", x: "-5%", y: "-5%", width: "110%", height: "110%", children: [
                      /* @__PURE__ */ jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: "2", seed: "4", result: "noise" }),
                      /* @__PURE__ */ jsx("feDisplacementMap", { in: "SourceGraphic", in2: "noise", scale: "2.6" })
                    ] }) }),
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: "125",
                        y: "188",
                        fontFamily: "'Caveat', cursive",
                        fontSize: "18",
                        fill: "hsl(var(--heritage-bordeaux))",
                        opacity: "0.9",
                        children: "start here ↘"
                      }
                    ),
                    pathSegments.map((d, i) => {
                      const visible = i < maxVisited;
                      return /* @__PURE__ */ jsxs("g", { children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d,
                            stroke: "hsl(var(--heritage-taupe))",
                            strokeWidth: "2.4",
                            strokeLinecap: "round",
                            fill: "none",
                            opacity: visible ? 0.25 : 0.08,
                            transform: "translate(1.5, 1.5)",
                            style: { transition: "opacity 0.6s ease" }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d,
                            stroke: "hsl(var(--heritage-orange))",
                            strokeWidth: "1.8",
                            strokeLinecap: "round",
                            fill: "none",
                            filter: "url(#sketch)",
                            strokeDasharray: `${PATH_LEN} ${PATH_LEN}`,
                            style: {
                              strokeDashoffset: visible ? 0 : PATH_LEN,
                              opacity: visible ? 0.9 : 0.18,
                              transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease"
                            }
                          }
                        )
                      ] }, i);
                    }),
                    stops.map((stop, i) => {
                      const isActive = i === active;
                      const isVisited = visited.has(i);
                      const filled = isActive || isVisited;
                      return /* @__PURE__ */ jsxs(
                        "g",
                        {
                          onClick: () => handleSelect(i),
                          className: "cursor-pointer",
                          role: "button",
                          tabIndex: 0,
                          "aria-label": `Stop ${i + 1}: ${stop.label}`,
                          children: [
                            isActive && /* @__PURE__ */ jsx(
                              "g",
                              {
                                style: {
                                  transformOrigin: `${stop.x}px ${stop.y}px`,
                                  animation: "daymap-spin 14s linear infinite"
                                },
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    d: sketchCircle(stop.x, stop.y, 22, 1.2),
                                    stroke: "hsl(var(--heritage-orange))",
                                    strokeWidth: "0.9",
                                    strokeDasharray: "3 4",
                                    fill: "none",
                                    opacity: "0.55",
                                    filter: "url(#sketch)"
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "path",
                              {
                                d: sketchCircle(stop.x, stop.y, 14, 0.7),
                                fill: filled ? "hsl(var(--heritage-orange))" : "hsl(var(--background))",
                                stroke: "hsl(var(--heritage-orange))",
                                strokeWidth: isActive ? 1.8 : 1.3,
                                filter: "url(#sketch)",
                                style: { transition: "fill 0.3s, stroke-width 0.3s" }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "text",
                              {
                                x: stop.x,
                                y: stop.y + 1,
                                textAnchor: "middle",
                                dominantBaseline: "central",
                                fontSize: "12",
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "0.05em",
                                fill: filled ? "hsl(var(--background))" : "hsl(var(--heritage-orange))",
                                children: String(i + 1).padStart(2, "0")
                              }
                            ),
                            isActive && /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx(
                                "image",
                                {
                                  href: stop.icon,
                                  x: stop.x - 18,
                                  y: stop.y - 56,
                                  width: "36",
                                  height: "36",
                                  opacity: "0.95",
                                  style: { filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.05))" }
                                }
                              ),
                              (() => {
                                const labelW = Math.max(72, stop.label.length * 8.2);
                                return /* @__PURE__ */ jsx("g", { filter: "url(#sketch)", children: /* @__PURE__ */ jsx(
                                  "rect",
                                  {
                                    x: stop.x - labelW / 2,
                                    y: stop.y + 26,
                                    width: labelW,
                                    height: "20",
                                    rx: "3",
                                    fill: "hsl(40 38% 95%)",
                                    stroke: "hsl(var(--heritage-orange))",
                                    strokeWidth: "1",
                                    opacity: "0.96"
                                  }
                                ) });
                              })(),
                              /* @__PURE__ */ jsx(
                                "text",
                                {
                                  x: stop.x,
                                  y: stop.y + 40,
                                  textAnchor: "middle",
                                  fill: "hsl(var(--heritage-purple))",
                                  fontSize: "13",
                                  fontFamily: "'Bebas Neue', sans-serif",
                                  letterSpacing: "0.18em",
                                  fontWeight: "500",
                                  children: stop.label.toUpperCase()
                                }
                              )
                            ] })
                          ]
                        },
                        i
                      );
                    }),
                    maxVisited >= stops.length - 1 && /* @__PURE__ */ jsxs(
                      "g",
                      {
                        transform: `translate(${stops[stops.length - 1].x + 30}, ${stops[stops.length - 1].y - 26})`,
                        opacity: "0.8",
                        filter: "url(#sketch)",
                        children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: sketchCircle(0, 0, 11, 0.9),
                              stroke: "hsl(var(--heritage-bordeaux))",
                              strokeWidth: "0.9",
                              fill: "none",
                              opacity: "0.55"
                            }
                          ),
                          /* @__PURE__ */ jsx("line", { x1: "-6", y1: "-6", x2: "6", y2: "6", stroke: "hsl(var(--heritage-bordeaux))", strokeWidth: "2", strokeLinecap: "round" }),
                          /* @__PURE__ */ jsx("line", { x1: "-6", y1: "6", x2: "6", y2: "-6", stroke: "hsl(var(--heritage-bordeaux))", strokeWidth: "2", strokeLinecap: "round" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("style", { children: `
            @keyframes daymap-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="daymap-spin"] { animation: none !important; }
            }
          ` })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center min-h-[280px]", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.4, ease: "easeOut" },
              className: "relative rounded-sm p-6 sm:p-8 lg:p-10 pl-7 sm:pl-10 lg:pl-12",
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    "aria-hidden": true,
                    viewBox: "0 0 8 240",
                    preserveAspectRatio: "none",
                    className: "absolute left-0 top-2 bottom-2 w-2",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M 4 4 C 6 50, 2 100, 4 150 C 6 190, 2 220, 4 236",
                        stroke: "hsl(var(--heritage-orange))",
                        strokeWidth: "1.6",
                        strokeLinecap: "round",
                        fill: "none"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "font-body text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-4", children: moments2[active].time }),
                /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1] mb-5", children: moments2[active].title }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground leading-relaxed text-base", children: moments2[active].text })
              ]
            },
            active
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mt-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goPrev,
                disabled: active === 0,
                className: "p-2 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                "aria-label": "Previous stop",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center", children: moments2.map((_, i) => {
              const isActive = i === active;
              const wasVisited = visited.has(i);
              return /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleSelect(i),
                  className: "w-3 h-3 flex items-center justify-center",
                  "aria-label": `Go to stop ${i + 1}`,
                  children: isActive ? /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "block w-3 h-3 rounded-full border-[1.5px] border-accent"
                    }
                  ) : /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `block w-2 h-2 rounded-full ${wasVisited ? "bg-accent/40" : "bg-border"}`
                    }
                  )
                },
                i
              );
            }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goNext,
                disabled: active === moments2.length - 1,
                className: "p-2 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                "aria-label": "Next stop",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
};
(_s = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _s.call(globalThis, "src/components/MosaicWall.tsx");
const MosaicWall = ({
  photos,
  duration = 60,
  rows: rowsProp = 5,
  columns: colsProp = 10
}) => {
  const shuffled = useMemo(() => {
    const arr = [...photos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [photos]);
  const [broken, setBroken] = useState(/* @__PURE__ */ new Set());
  const pool = shuffled.filter((src) => !broken.has(src));
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const rows = isMobile ? Math.min(3, rowsProp) : rowsProp;
  const columns = isMobile ? Math.min(4, colsProp) : colsProp;
  const slots = rows * columns;
  const tiles = [];
  if (pool.length > 0) {
    for (let i = 0; i < slots; i++) tiles.push(pool[i % pool.length]);
  }
  const containerRef = useRef(null);
  const [tileSize, setTileSize] = useState(120);
  const gap = 5;
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const size2 = Math.max(40, (w - gap * (columns - 1)) / columns);
      setTileSize(size2);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [columns]);
  const frameHeight = rows * tileSize + (rows - 1) * gap;
  const renderStrip = (keyPrefix) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid h-full shrink-0",
      style: {
        gap: `${gap}px`,
        marginRight: `${gap}px`,
        gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
        gridAutoFlow: "column"
      },
      children: tiles.map((src, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "overflow-hidden rounded-[3px] bg-muted",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: "",
              "aria-hidden": "true",
              loading: "lazy",
              decoding: "async",
              onError: () => setBroken((prev) => {
                if (prev.has(src)) return prev;
                const next = new Set(prev);
                next.add(src);
                return next;
              }),
              className: "w-full h-full object-cover block select-none pointer-events-none",
              draggable: false
            }
          )
        },
        `${keyPrefix}-${src}-${i}`
      ))
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative w-full overflow-hidden rounded-sm",
      style: { height: `${frameHeight}px` },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center mosaic-marquee", children: [
          renderStrip("a"),
          renderStrip("b")
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes mosaicMarquee {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .mosaic-marquee {
          width: max-content;
          animation: mosaicMarquee ${duration}s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .mosaic-marquee { animation: none !important; }
        }
      ` })
      ]
    }
  );
};
const p17 = "/assets/p17-Cri_JKfM.jpg";
const p18 = "/assets/p18-BqXSNP2E.jpg";
const p19 = "/assets/p19-DiJllsP7.jpg";
const p20 = "/assets/p20-vZIcwELQ.jpg";
const p21 = "/assets/p21-BDwn73id.jpg";
const p22 = "/assets/p22-BSaz0G4m.jpg";
const p23 = "/assets/p23-lsrMyzM2.jpg";
const p24 = "/assets/p24-vkNS6mv1.jpg";
const p25 = "/assets/p25-BiSJJp0J.jpg";
const p26 = "/assets/p26-Dr01oq39.jpg";
const p27 = "/assets/p27-ND4tAxCY.jpg";
const p28 = "/assets/p28-B8dCxkR-.jpg";
const p29 = "/assets/p29-CZFQ_qTH.jpg";
const p30 = "/assets/p30-gsI9Hrhz.jpg";
const p31 = "/assets/p31-to-gwCKA.jpg";
const p32 = "/assets/p32-BRS1u1SY.jpg";
const p33 = "/assets/p33-BYh0nGDN.jpg";
const p34 = "/assets/p34-VhVUxe2A.jpg";
const p35 = "/assets/p35-eMb7dFrP.jpg";
const p36 = "/assets/p36-Djyzuv17.jpg";
const p37 = "/assets/p37-BD8WAXPh.jpg";
const p38 = "/assets/p38-fXis-w8z.jpg";
const p39 = "/assets/p39-CbwIQ5W0.jpg";
const p40 = "/assets/p40-wbienw5T.jpg";
const p41 = "/assets/p41-Hv2Lirvc.jpg";
const p42 = "/assets/p42-KEHfcc7k.jpg";
const p43 = "/assets/p43-BQxtTQ5e.jpg";
const p44 = "/assets/p44-B9f_GzvK.jpg";
const p45 = "/assets/p45-BW3fOZWW.jpg";
const p46 = "/assets/p46-BqLfnSK8.jpg";
const p47 = "/assets/p47-Dehg_Q1K.jpg";
const p48 = "/assets/p48-CY0qRRWw.jpg";
const p49 = "/assets/p49-BB9dSNf_.jpg";
const p50 = "/assets/p50-DYEqvi29.jpg";
const p51 = "/assets/p51-Dxz80k6-.jpg";
const p52 = "/assets/p52-BSfIiefO.jpg";
const p53 = "/assets/p53-BMtV5fUc.jpg";
const p54 = "/assets/p54-nTB8sOvi.jpg";
const p55 = "/assets/p55-DTRYh2_k.jpg";
const p56 = "/assets/p56-y3oAM4q0.jpg";
const p57 = "/assets/p57-B6Ww14a8.jpg";
const p58 = "/assets/p58-Dyl2uUIJ.jpg";
const p59 = "/assets/p59-DtFsVsK9.jpg";
const p60 = "/assets/p60-BrU3yy7g.jpg";
const p61 = "/assets/p61-BRegMr3a.jpg";
const p62 = "/assets/p62-DLxj3EmV.jpg";
const p63 = "/assets/p63-kwQ6djzt.jpg";
const p64 = "/assets/p64-BgeZBy6A.jpg";
const p65 = "/assets/p65-CO9G5aLQ.jpg";
const p66 = "/assets/p66-C-5ZEs0T.jpg";
(_t = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _t.call(globalThis, "src/assets/guests/index.ts");
const sourcePhotos = [
  p17,
  p18,
  p19,
  p20,
  p21,
  p22,
  p23,
  p24,
  p25,
  p26,
  p27,
  p28,
  p29,
  p30,
  p31,
  p32,
  p33,
  p34,
  p35,
  p36,
  p37,
  p38,
  p39,
  p40,
  p41,
  p42,
  p43,
  p44,
  p45,
  p46,
  p47,
  p48,
  p49,
  p50,
  p51,
  p52,
  p53,
  p54,
  p55,
  p56,
  p57,
  p58,
  p59,
  p60,
  p61,
  p62,
  p63,
  p64,
  p65,
  p66
];
const TARGET = 50;
function build50() {
  const seededShuffle = (arr, seed) => {
    const a = [...arr];
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor(s / 233280 * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const out = [];
  let pass = 0;
  while (out.length < TARGET) {
    const shuffled = seededShuffle(sourcePhotos, pass + 1);
    for (const photo of shuffled) {
      if (out.length >= TARGET) break;
      if (out.length > 0 && out[out.length - 1] === photo) continue;
      out.push(photo);
    }
    pass++;
  }
  return out;
}
const guestPhotos = build50();
const version$4 = 1;
const asset_id$4 = "f5e8e951-96b9-49d6-b01c-be8aa7c06c44";
const project_id$4 = "d8f5b35b-ed2f-4aed-a9c2-4376af53467e";
const url$4 = "/__l5e/assets-v1/f5e8e951-96b9-49d6-b01c-be8aa7c06c44/dennis-hero.jpg";
const r2_key$4 = "a/v1/d8f5b35b-ed2f-4aed-a9c2-4376af53467e/f5e8e951-96b9-49d6-b01c-be8aa7c06c44/dennis-hero.jpg";
const original_filename$4 = "dennis-hero.jpg";
const size$4 = 889094;
const content_type$4 = "image/jpeg";
const created_at$4 = "2026-07-10T09:48:51Z";
const dennisBoat = {
  version: version$4,
  asset_id: asset_id$4,
  project_id: project_id$4,
  url: url$4,
  r2_key: r2_key$4,
  original_filename: original_filename$4,
  size: size$4,
  content_type: content_type$4,
  created_at: created_at$4
};
(_u = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _u.call(globalThis, "src/components/HeroCarousel.tsx");
lovableAssetUrl(dennisBoat.url);
const dennisCanalSmile$1 = lovableAssetUrl(dennisBoat.url);
lovableAssetUrl(dennisBoat.url);
const HeroGreenHelloCaps = ({ divider = true }) => /* @__PURE__ */ jsx("div", { className: "w-full container mx-auto px-6 lg:px-12 py-10 md:py-14", children: /* @__PURE__ */ jsx(
  "div",
  {
    className: "relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28",
    style: { backgroundColor: "hsl(var(--heritage-green))" },
    children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-6xl", style: { zIndex: 10 }, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center lg:items-start", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: dennisCanalSmile$1,
            alt: "Dennis Gerrits on an Amsterdam canal bridge",
            className: "w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-body text-sm tracking-widest uppercase mt-6",
            style: { color: "hsl(var(--heritage-orange))" },
            children: "Storyteller, Host & Travel Companion"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(FadeIn, { delay: 0.2, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 md:mb-8", children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "font-heading text-[2rem] xs:text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]",
              style: { color: "hsl(var(--background))" },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "block whitespace-nowrap uppercase tracking-tight",
                    style: { color: "hsl(var(--heritage-orange))" },
                    children: "HELLO,"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "relative inline-block whitespace-nowrap uppercase tracking-tight",
                    style: { color: "hsl(var(--heritage-orange))" },
                    children: [
                      "I'M DENNIS.",
                      divider && /* @__PURE__ */ jsx(
                        "svg",
                        {
                          "aria-hidden": true,
                          viewBox: "0 0 200 12",
                          preserveAspectRatio: "none",
                          className: "absolute left-0 -bottom-2 w-full h-3",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M 4 8 C 60 2, 130 10, 196 5",
                              stroke: "hsl(var(--heritage-orange))",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              fill: "none"
                            }
                          )
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-heading text-[1.5rem] sm:text-2xl md:text-3xl lg:text-4xl leading-[1.2] mt-3 tracking-[0.12em]",
              style: { color: "hsl(var(--background))" },
              children: "A friend who knows the city."
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-body italic text-lg leading-relaxed max-w-lg mb-3",
            style: { color: "hsl(var(--background) / 0.9)" },
            children: "We slow down, follow curiosity, and discover places together, one story at a time. The best moments are rarely planned."
          }
        )
      ] })
    ] }) })
  }
) });
const HeroCarousel = () => /* @__PURE__ */ jsx("section", { id: "hero", className: "relative scroll-mt-20", children: /* @__PURE__ */ jsx("div", { className: "min-h-[85vh] flex items-center", children: /* @__PURE__ */ jsx(HeroGreenHelloCaps, { divider: true }) }) });
(_v = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _v.call(globalThis, "src/components/RichText.tsx");
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote"
];
const ALLOWED_ATTR = ["href", "target", "rel"];
const isLikelyHtml = (s) => /<\/?[a-z][\s\S]*>/i.test(s);
const RichText = ({ html, fallback = "", className }) => {
  const value = html && html.trim() !== "" ? html : fallback;
  const sanitized = useMemo(() => {
    if (!value) return "";
    const source = isLikelyHtml(value) ? value : `<p>${value.replace(/\n+/g, "</p><p>")}</p>`;
    const clean = DOMPurify.sanitize(source, {
      ALLOWED_TAGS,
      ALLOWED_ATTR
    });
    return clean.replace(
      /<a /g,
      '<a target="_blank" rel="noopener noreferrer" '
    );
  }, [value]);
  if (!sanitized) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("rich-text", className),
      dangerouslySetInnerHTML: { __html: sanitized }
    }
  );
};
(_w = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _w.call(globalThis, "src/hooks/useSiteContent.ts");
let cache = null;
let overrides = null;
const listeners = /* @__PURE__ */ new Set();
async function load() {
  const { data } = await supabase.from("site_content").select("key,value");
  const map = {};
  (data || []).forEach((r) => map[r.key] = r.value);
  cache = map;
  notify();
}
function notify() {
  listeners.forEach((l) => l(cache || {}));
}
if (typeof window !== "undefined") {
  window.addEventListener("message", (event) => {
    if (event.source !== window.parent) return;
    const data = event.data;
    if (data && data.type === "site-content-preview" && data.values) {
      overrides = data.values;
      notify();
    }
  });
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage({ type: "site-content-preview-ready" }, "*");
    } catch {
    }
  }
}
function useSiteContent() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    listeners.add(fn);
    if (cache === null) load();
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return (key, fallback) => {
    if (overrides && overrides[key] !== void 0 && overrides[key] !== "") {
      return overrides[key];
    }
    return cache && cache[key] !== void 0 && cache[key] !== "" ? cache[key] : fallback;
  };
}
async function refreshSiteContent() {
  await load();
}
const version$3 = 1;
const asset_id$3 = "47f498da-ba40-413b-8814-9a588da1c944";
const project_id$3 = "d8f5b35b-ed2f-4aed-a9c2-4376af53467e";
const url$3 = "/__l5e/assets-v1/47f498da-ba40-413b-8814-9a588da1c944/dennis-person-original.jpg";
const r2_key$3 = "a/v1/d8f5b35b-ed2f-4aed-a9c2-4376af53467e/47f498da-ba40-413b-8814-9a588da1c944/dennis-person-original.jpg";
const original_filename$3 = "dennis-person-original.jpg";
const size$3 = 255029;
const content_type$3 = "image/jpeg";
const created_at$3 = "2026-08-03T21:32:24Z";
const dennisPersonAsset = {
  version: version$3,
  asset_id: asset_id$3,
  project_id: project_id$3,
  url: url$3,
  r2_key: r2_key$3,
  original_filename: original_filename$3,
  size: size$3,
  content_type: content_type$3,
  created_at: created_at$3
};
const version$2 = 1;
const asset_id$2 = "73ddf75d-6b44-4ff0-bff1-c84ea9a6492b";
const project_id$2 = "d8f5b35b-ed2f-4aed-a9c2-4376af53467e";
const url$2 = "/__l5e/assets-v1/73ddf75d-6b44-4ff0-bff1-c84ea9a6492b/dennis-guide-original.jpg";
const r2_key$2 = "a/v1/d8f5b35b-ed2f-4aed-a9c2-4376af53467e/73ddf75d-6b44-4ff0-bff1-c84ea9a6492b/dennis-guide-original.jpg";
const original_filename$2 = "dennis-guide-original.jpg";
const size$2 = 432551;
const content_type$2 = "image/jpeg";
const created_at$2 = "2026-08-03T21:32:28Z";
const dennisGuideAsset = {
  version: version$2,
  asset_id: asset_id$2,
  project_id: project_id$2,
  url: url$2,
  r2_key: r2_key$2,
  original_filename: original_filename$2,
  size: size$2,
  content_type: content_type$2,
  created_at: created_at$2
};
(_x = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _x.call(globalThis, "src/components/AboutCarousel.tsx");
const PERSON_FALLBACK = "I have always been drawn to stories, people and places that move you in some way.\n\nAmsterdam became that place for me. I’ve called this city home for more than twenty years now, and over time it became an integral part of who I am.\n\nThis city gave me freedom. It connected me to the world and shaped me into the person I am today. Curious, creative and fascinated by culture, art, architecture, nature, and the rhythm of life.";
const GUIDE_FALLBACK = "For me, discovering places should feel personal, relaxed and natural. More like spending time with a local friend.\n\nI always listen first. Every person experiences a place differently, which is why I take the time to understand who you are and what inspires you.\n\nI carefully shape each day around you, creating experiences that feel meaningful. More than anything, I’m simply somebody who walks beside you during your trip.";
const dennisPersonBike = lovableAssetUrl(dennisPersonAsset.url);
const dennisGuideHands = lovableAssetUrl(dennisGuideAsset.url);
const ASPECT_PRESETS = [
  { label: "4:5", value: 4 / 5 },
  { label: "1:1", value: 1 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 }
];
const DEFAULT_ADJUSTMENTS = {
  person: { x: 50, y: 55, zoom: 100, rotate: 0, ratio: 16 / 9, ratioMobile: 4 / 5 },
  guide: { x: 72, y: 48, zoom: 100, rotate: 0, ratio: 16 / 9, ratioMobile: 4 / 5 }
};
const usePhotoEditorFlag = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    try {
      setEnabled(
        new URLSearchParams(window.location.search).has("edit-photos") || localStorage.getItem("about-photo-editor-enabled") === "true"
      );
    } catch {
      setEnabled(false);
    }
  }, []);
  return enabled;
};
const STORAGE_KEY = "about-photo-adjustments-v5";
const loadAdjustments = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ADJUSTMENTS;
    const parsed = JSON.parse(raw);
    return {
      person: { ...DEFAULT_ADJUSTMENTS.person, ...parsed.person },
      guide: { ...DEFAULT_ADJUSTMENTS.guide, ...parsed.guide }
    };
  } catch {
    return DEFAULT_ADJUSTMENTS;
  }
};
const saveAdjustments = (a) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
  }
};
const EditablePhoto = ({
  src,
  alt,
  setting,
  editable,
  onChange,
  fillContainer = false
}) => {
  const stateRef = useRef(setting);
  stateRef.current = setting;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const editableRef = useRef(editable);
  editableRef.current = editable;
  const nodeRef = useRef(null);
  const dragRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  const activeRatio = isMobile ? setting.ratioMobile : setting.ratio;
  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!editableRef.current) return;
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const next = Math.min(300, Math.max(100, stateRef.current.zoom * Math.exp(-dy * 15e-4)));
      onChangeRef.current({ zoom: Math.round(next) });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const handlePointerDown = (e) => {
    if (!editable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = { x: e.clientX, y: e.clientY, w: rect.width, h: rect.height };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    const d = dragRef.current;
    if (!editable || !d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    dragRef.current = { ...d, x: e.clientX, y: e.clientY };
    const s = stateRef.current;
    onChangeRef.current({
      x: Math.round(Math.min(150, Math.max(-50, s.x - dx / d.w * 100))),
      y: Math.round(Math.min(150, Math.max(-50, s.y - dy / d.h * 100)))
    });
  };
  const endDrag = (e) => {
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: nodeRef,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      className: `relative w-full overflow-hidden ${fillContainer ? "h-full" : ""}`,
      style: {
        aspectRatio: fillContainer ? void 0 : String(activeRatio),
        cursor: editable ? "grab" : void 0,
        touchAction: editable ? "none" : void 0
      },
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            className: "absolute inset-0 h-full w-full object-cover select-none",
            style: {
              objectPosition: `${setting.x}% ${setting.y}%`,
              transform: `scale(${setting.zoom / 100}) rotate(${setting.rotate}deg)`,
              transformOrigin: `${setting.x}% ${setting.y}%`
            },
            draggable: false,
            loading: "lazy"
          }
        ),
        editable && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 ring-2 ring-inset ring-[hsl(var(--heritage-orange))]/70" })
      ]
    }
  );
};
const AboutFourFrames = () => {
  const t = useSiteContent();
  const [adjustments, setAdjustments] = useState(loadAdjustments);
  const [editing, setEditing] = useState(false);
  const updatePhoto = useCallback(
    (photo, patch) => {
      setAdjustments((prev) => {
        const next = { ...prev, [photo]: { ...prev[photo], ...patch } };
        saveAdjustments(next);
        return next;
      });
    },
    []
  );
  const resetPhotos = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    saveAdjustments(DEFAULT_ADJUSTMENTS);
  }, []);
  const showEditor = usePhotoEditorFlag();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:min-h-[75vh]", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-background flex items-center px-6 sm:px-10 md:px-10 lg:px-7 py-10 sm:py-14 lg:py-12", children: /* @__PURE__ */ jsx(FadeIn, { className: "w-full", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-[10px] lg:text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-3", children: t("about.person.kicker", "A True Amsterdammer") }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[2.75rem] xl:text-5xl text-foreground leading-[0.95] mb-4", children: t("about.person.title", "The Person") }),
        /* @__PURE__ */ jsx("svg", { "aria-hidden": true, width: "80", height: "9", viewBox: "0 0 96 10", className: "mb-4 lg:w-[4.5rem]", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 2 6 Q 16 1, 32 5 T 64 5 T 94 4",
            fill: "none",
            stroke: "hsl(var(--heritage-orange))",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        ) }),
        /* @__PURE__ */ jsx(
          RichText,
          {
            className: "font-body text-base md:text-lg lg:text-base xl:text-lg text-foreground/85 leading-relaxed",
            html: t("about.person.body", ""),
            fallback: PERSON_FALLBACK
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-background h-80 md:h-auto md:min-h-[24rem] lg:min-h-0", children: /* @__PURE__ */ jsx(
        EditablePhoto,
        {
          src: dennisPersonBike,
          alt: "Dennis Gerrits sitting on his bicycle on an Amsterdam bridge",
          setting: adjustments.person,
          editable: showEditor && editing,
          onChange: (patch) => updatePhoto("person", patch),
          fillContainer: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "bg-primary flex items-center px-6 sm:px-10 md:px-10 lg:px-7 py-10 sm:py-14 lg:py-12", children: /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, className: "w-full", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-[10px] lg:text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-3", children: t("about.guide.kicker", "Helping you find your own way") }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[2.75rem] xl:text-5xl text-primary-foreground leading-[0.95] mb-4", children: t("about.guide.title", "The Guide") }),
        /* @__PURE__ */ jsx("svg", { "aria-hidden": true, width: "80", height: "9", viewBox: "0 0 96 10", className: "mb-4 lg:w-[4.5rem]", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 2 6 Q 16 1, 32 5 T 64 5 T 94 4",
            fill: "none",
            stroke: "hsl(var(--heritage-orange))",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        ) }),
        /* @__PURE__ */ jsx(
          RichText,
          {
            className: "font-body text-base md:text-lg lg:text-base xl:text-lg text-primary-foreground/90 leading-relaxed",
            html: t("about.guide.body", ""),
            fallback: GUIDE_FALLBACK
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-primary h-80 md:h-auto md:min-h-[24rem] lg:min-h-0", children: /* @__PURE__ */ jsx(
        EditablePhoto,
        {
          src: dennisGuideHands,
          alt: "Dennis Gerrits sharing a story while guiding in Amsterdam",
          setting: adjustments.guide,
          editable: showEditor && editing,
          onChange: (patch) => updatePhoto("guide", patch),
          fillContainer: true
        }
      ) })
    ] }),
    showEditor && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setEditing((v) => !v),
          className: "rounded-full px-4 py-2 text-sm font-body font-medium shadow-lg transition-transform hover:scale-105",
          style: {
            backgroundColor: "hsl(var(--heritage-orange))",
            color: "hsl(var(--primary))"
          },
          "aria-expanded": editing,
          children: editing ? "Close photo editor" : "Edit photos"
        }
      ),
      editing && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-72 sm:w-80 max-h-[75vh] overflow-y-auto rounded-lg p-4 shadow-xl",
          style: {
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--heritage-taupe))"
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-heading text-lg text-primary", children: "Photo editor" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: resetPhotos,
                  className: "flex items-center gap-1 text-xs font-body font-medium text-secondary hover:text-primary",
                  title: "Reset to defaults",
                  children: [
                    /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
                    "Reset"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-[10px] font-body text-foreground/50 leading-snug", children: "Drag a photo to move it, scroll or pinch on it to zoom. Sliders update live." }),
            ["person", "guide"].map((photo) => /* @__PURE__ */ jsxs("div", { className: "mb-4 last:mb-0", children: [
              /* @__PURE__ */ jsx("p", { className: "font-body text-xs uppercase tracking-wider text-secondary mb-2", children: photo === "person" ? "The Person" : "The Guide" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 mb-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-body text-foreground/60 w-10", children: "Desktop" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: ASPECT_PRESETS.map((preset) => {
                    const active = Math.abs(adjustments[photo].ratio - preset.value) < 1e-3;
                    return /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updatePhoto(photo, { ratio: preset.value }),
                        className: "rounded px-2 py-1 text-[10px] font-body font-medium border transition-colors",
                        style: {
                          borderColor: "hsl(var(--heritage-taupe))",
                          backgroundColor: active ? "hsl(var(--heritage-orange))" : "transparent",
                          color: active ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                        },
                        children: preset.label
                      },
                      `d-${preset.label}`
                    );
                  }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-body text-foreground/60 w-10", children: "Mobile" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: ASPECT_PRESETS.map((preset) => {
                    const active = Math.abs(adjustments[photo].ratioMobile - preset.value) < 1e-3;
                    return /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updatePhoto(photo, { ratioMobile: preset.value }),
                        className: "rounded px-2 py-1 text-[10px] font-body font-medium border transition-colors",
                        style: {
                          borderColor: "hsl(var(--heritage-taupe))",
                          backgroundColor: active ? "hsl(var(--heritage-orange))" : "transparent",
                          color: active ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                        },
                        children: preset.label
                      },
                      `m-${preset.label}`
                    );
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs font-body text-foreground/80", children: [
                  /* @__PURE__ */ jsx(Move, { className: "w-3 h-3 shrink-0" }),
                  "Horizontal",
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: -50,
                      max: 150,
                      value: adjustments[photo].x,
                      onChange: (e) => updatePhoto(photo, { x: Number(e.target.value) }),
                      className: "flex-1",
                      style: { accentColor: "hsl(var(--heritage-orange))" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "w-8 text-right tabular-nums", children: adjustments[photo].x })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs font-body text-foreground/80", children: [
                  /* @__PURE__ */ jsx(Move, { className: "w-3 h-3 shrink-0" }),
                  "Vertical",
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: -50,
                      max: 150,
                      value: adjustments[photo].y,
                      onChange: (e) => updatePhoto(photo, { y: Number(e.target.value) }),
                      className: "flex-1",
                      style: { accentColor: "hsl(var(--heritage-orange))" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "w-8 text-right tabular-nums", children: adjustments[photo].y })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs font-body text-foreground/80", children: [
                  /* @__PURE__ */ jsx(ZoomIn, { className: "w-3 h-3 shrink-0" }),
                  "Zoom",
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: 100,
                      max: 300,
                      value: adjustments[photo].zoom,
                      onChange: (e) => updatePhoto(photo, { zoom: Number(e.target.value) }),
                      className: "flex-1",
                      style: { accentColor: "hsl(var(--heritage-orange))" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "w-8 text-right tabular-nums", children: adjustments[photo].zoom })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs font-body text-foreground/80", children: [
                  /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3 shrink-0" }),
                  "Rotate",
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: -15,
                      max: 15,
                      step: 0.5,
                      value: adjustments[photo].rotate,
                      onChange: (e) => updatePhoto(photo, { rotate: Number(e.target.value) }),
                      className: "flex-1",
                      style: { accentColor: "hsl(var(--heritage-orange))" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "w-8 text-right tabular-nums", children: adjustments[photo].rotate })
                ] })
              ] })
            ] }, photo)),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-[10px] font-body text-foreground/50 leading-snug", children: "Adjustments are saved in your browser. Share the values below if you want them applied to the site." }),
            /* @__PURE__ */ jsx(
              "pre",
              {
                className: "mt-1 text-[10px] font-mono p-2 rounded overflow-x-auto",
                style: { backgroundColor: "hsl(var(--heritage-taupe-tint))" },
                children: JSON.stringify(adjustments, null, 2)
              }
            )
          ]
        }
      )
    ] })
  ] });
};
const AboutCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 30
  });
  const [selected, setSelected] = useState(0);
  useCallback(
    (i) => emblaApi == null ? void 0 : emblaApi.scrollTo(i),
    [emblaApi]
  );
  useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollPrev(), [emblaApi]);
  useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  return /* @__PURE__ */ jsx("section", { id: "about", className: "relative scroll-mt-20", children: /* @__PURE__ */ jsx(AboutFourFrames, {}) });
};
const dennisRickSteves = "/assets/dennis_rick_steves-Mq1aornr.jpg";
const iconTickets = "/assets/icon-tickets-BbuPbMfD.png";
const iconMessage = "/assets/icon-message-CKrvnCUm.png";
const iconTransport = "/assets/icon-transport-CkZb3R0M.png";
const iconHotel = "/assets/icon-hotel-BVLsVpj3.png";
(_y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _y.call(globalThis, "src/components/ui/input.tsx");
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
(_z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _z.call(globalThis, "src/components/ui/textarea.tsx");
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
(_A = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _A.call(globalThis, "src/components/ui/label.tsx");
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const version$1 = 1;
const asset_id$1 = "9d4093d0-852e-42d7-896f-a920592d2678";
const project_id$1 = "d8f5b35b-ed2f-4aed-a9c2-4376af53467e";
const url$1 = "/__l5e/assets-v1/9d4093d0-852e-42d7-896f-a920592d2678/dennis-contact.jpg";
const r2_key$1 = "a/v1/d8f5b35b-ed2f-4aed-a9c2-4376af53467e/9d4093d0-852e-42d7-896f-a920592d2678/dennis-contact.jpg";
const original_filename$1 = "dennis-contact.jpg";
const size$1 = 1014812;
const content_type$1 = "image/jpeg";
const created_at$1 = "2026-07-15T16:05:04Z";
const dennisContactAsset = {
  version: version$1,
  asset_id: asset_id$1,
  project_id: project_id$1,
  url: url$1,
  r2_key: r2_key$1,
  original_filename: original_filename$1,
  size: size$1,
  content_type: content_type$1,
  created_at: created_at$1
};
(_B = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _B.call(globalThis, "src/components/ContactSection.tsx");
const dennisCanalSmile = lovableAssetUrl(dennisContactAsset.url);
const ContactSection = () => {
  const { toast: toast2 } = useToast();
  const t = useSiteContent();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast2({ title: "Message sent", description: "Thank you. I'll be in touch soon." });
    setContactForm({ name: "", email: "", message: "" });
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "contact",
      className: "relative py-16 md:py-20 lg:py-24 scroll-mt-20",
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "relative overflow-hidden rounded-3xl px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20",
          style: { backgroundColor: "hsl(var(--heritage-green))" },
          children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl", style: { zIndex: 10 }, children: [
            /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 md:mb-12 lg:mb-14", children: [
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: "font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-4",
                  style: { color: "hsl(var(--heritage-orange))" },
                  children: [
                    "– ",
                    t("booking.kicker", "Get in Touch"),
                    " –"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] mx-auto max-w-none md:whitespace-nowrap",
                  style: { color: "hsl(var(--background))" },
                  children: t("booking.title", "Let's See if We're a Good Match")
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "max-w-4xl mx-auto text-center mb-10 md:mb-12",
                style: { color: "hsl(var(--background) / 0.9)" },
                children: /* @__PURE__ */ jsx(
                  RichText,
                  {
                    className: "font-body text-base md:text-lg leading-relaxed",
                    html: t("booking.intro", ""),
                    fallback: "Send me a message, and I’ll reply within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each other."
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 lg:gap-14 items-stretch", children: [
              /* @__PURE__ */ jsx(FadeIn, { className: "h-full", children: /* @__PURE__ */ jsx("div", { className: "relative h-full min-h-[280px] lg:min-h-0 rounded-sm shadow-xl overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: dennisCanalSmile,
                  alt: "Dennis smiling on a canal bridge",
                  loading: "lazy",
                  className: "absolute inset-0 w-full h-full object-cover",
                  style: { filter: "saturate(0.92) contrast(0.98)", objectPosition: "center" }
                }
              ) }) }),
              /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, className: "h-full", children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "bg-background p-6 sm:p-8 lg:p-10 border-l-4 shadow-2xl rounded-sm h-full",
                  style: { borderLeftColor: "hsl(var(--heritage-orange))" },
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl text-primary mb-3", children: t("booking.form.title", "Let’s Connect") }),
                    /* @__PURE__ */ jsx(
                      RichText,
                      {
                        className: "font-body text-muted-foreground leading-relaxed mb-8",
                        html: t("booking.form.intro", ""),
                        fallback: "Leave your contact details and tell me a little about yourself and the experience you're hoping for."
                      }
                    ),
                    /* @__PURE__ */ jsxs("form", { onSubmit: handleContactSubmit, className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Your Name" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            required: true,
                            value: contactForm.name,
                            onChange: (e) => setContactForm({ ...contactForm, name: e.target.value }),
                            className: "h-12 text-base font-body",
                            placeholder: "e.g. Jane Smith"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Email Address" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            required: true,
                            type: "email",
                            value: contactForm.email,
                            onChange: (e) => setContactForm({ ...contactForm, email: e.target.value }),
                            className: "h-12 text-base font-body",
                            placeholder: "jane@example.com"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Tell Me a Little About Your Trip" }),
                        /* @__PURE__ */ jsx(
                          Textarea,
                          {
                            value: contactForm.message,
                            onChange: (e) => setContactForm({ ...contactForm, message: e.target.value }),
                            className: "min-h-[140px] text-base font-body",
                            placeholder: "When are you visiting? What are you curious about?"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          className: "w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300",
                          children: t("booking.form.cta", "Reach out")
                        }
                      )
                    ] })
                  ]
                }
              ) })
            ] })
          ] })
        }
      ) })
    }
  );
};
const imgNeighbourhood = "/assets/neighbourhood-uxA31CWM.jpg";
const imgFood = "/assets/food-DWSmYAvQ.jpg";
const imgWater = "/assets/water-CAytjipm.jpg";
const imgArchitecture = "/assets/architecture-BMwQly8G.jpg";
const podcastHosts = "/assets/podcast-hosts-D2gXzJRS.jpg";
const version = 1;
const asset_id = "00fbcb6f-7400-4862-a4b0-33a86b894349";
const project_id = "d8f5b35b-ed2f-4aed-a9c2-4376af53467e";
const url = "/__l5e/assets-v1/00fbcb6f-7400-4862-a4b0-33a86b894349/dennis-radio-taboe.jpg";
const r2_key = "a/v1/d8f5b35b-ed2f-4aed-a9c2-4376af53467e/00fbcb6f-7400-4862-a4b0-33a86b894349/dennis-radio-taboe.jpg";
const original_filename = "dennis-radio-taboe.jpg";
const size = 637654;
const content_type = "image/jpeg";
const created_at = "2026-06-11T18:49:45Z";
const dennisRadioTaboe = {
  version,
  asset_id,
  project_id,
  url,
  r2_key,
  original_filename,
  size,
  content_type,
  created_at
};
const podcastCover = "/assets/podcast-cover-ChQxddPf.jpg";
(_C = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _C.call(globalThis, "src/components/PodcastPlayer.tsx");
const EPISODE_AUDIO_URL = "https://twostoriesonecity.com/episode-0.mp3";
const EPISODE_LINK = "https://twostoriesonecity.com";
const formatTime = (s) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};
const PodcastPlayer = forwardRef(
  ({ tone = "light" }, ref) => {
    const dark = tone === "dark";
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
      const a = audioRef.current;
      if (!a) return;
      const onTime = () => setCurrent(a.currentTime);
      const onMeta = () => setDuration(a.duration);
      const onEnd = () => setPlaying(false);
      a.addEventListener("timeupdate", onTime);
      a.addEventListener("loadedmetadata", onMeta);
      a.addEventListener("ended", onEnd);
      return () => {
        a.removeEventListener("timeupdate", onTime);
        a.removeEventListener("loadedmetadata", onMeta);
        a.removeEventListener("ended", onEnd);
      };
    }, []);
    const toggle = () => {
      const a = audioRef.current;
      if (!a) return;
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };
    useImperativeHandle(ref, () => ({
      play: () => {
        const a = audioRef.current;
        if (a) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      },
      pause: () => {
        const a = audioRef.current;
        if (a) {
          a.pause();
          setPlaying(false);
        }
      },
      toggle
    }));
    const onSeek = (e) => {
      const a = audioRef.current;
      if (!a || !duration) return;
      const t = Number(e.target.value) / 100 * duration;
      a.currentTime = t;
      setCurrent(t);
    };
    const progress = duration ? current / duration * 100 : 0;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 md:gap-7 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: toggle,
          "aria-label": playing ? "Pause episode" : "Play episode",
          className: "relative w-14 h-14 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-sm shadow-md group",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: podcastCover,
                alt: "Two Stories, One City – podcast cover art",
                loading: "lazy",
                width: 256,
                height: 256,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                style: {
                  backgroundColor: dark ? "hsl(var(--heritage-green) / 0.55)" : "hsl(var(--primary) / 0.5)",
                  color: dark ? "hsl(0 0% 98%)" : "hsl(var(--primary-foreground))"
                },
                children: playing ? /* @__PURE__ */ jsx(Pause, { size: 22, fill: "currentColor" }) : /* @__PURE__ */ jsx(Play, { size: 22, fill: "currentColor" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-body text-xs tracking-widest uppercase mb-1",
            style: { color: dark ? "hsl(var(--heritage-orange))" : "hsl(var(--secondary))" },
            children: "The Podcast · Episode 0 out now"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "font-heading text-2xl md:text-3xl leading-tight",
            style: { color: dark ? "hsl(0 0% 98%)" : "hsl(var(--primary))" },
            children: "Two Stories, One City • AMSTERDAM"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "font-body text-xs tabular-nums w-10",
              style: { color: dark ? "hsl(0 0% 80%)" : "hsl(var(--muted-foreground))" },
              children: formatTime(current)
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              step: 0.1,
              value: progress,
              onChange: onSeek,
              "aria-label": "Seek",
              className: `flex-1 h-1 cursor-pointer ${dark ? "" : "accent-secondary"}`,
              style: dark ? { accentColor: "hsl(var(--heritage-orange))" } : void 0
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "font-body text-xs tabular-nums w-10 text-right",
              style: { color: dark ? "hsl(0 0% 80%)" : "hsl(var(--muted-foreground))" },
              children: formatTime(duration)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: EPISODE_LINK,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-block mt-2 font-body text-sm transition-colors hover:opacity-80",
            style: { color: dark ? "hsl(0 0% 88%)" : "hsl(var(--muted-foreground))" },
            children: "Listen at twostoriesonecity.com →"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("audio", { ref: audioRef, src: EPISODE_AUDIO_URL, preload: "metadata" })
    ] });
  }
);
PodcastPlayer.displayName = "PodcastPlayer";
(_D = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _D.call(globalThis, "src/pages/Index.tsx");
const moments = [
  {
    time: "Beginning of the day",
    title: "Meeting",
    text: "I’ll meet you at your hotel and together we slowly step into the rhythm of the city. Just an easy walk through one of Amsterdam’s beautiful neighborhoods as the day begins."
  },
  {
    time: "Morning",
    title: "Coffee & Conversation",
    text: "Somewhere along the way, we can stop at a small local café for a good cup of coffee. A moment to slow down, observe the city around us and simply enjoy the atmosphere."
  },
  {
    time: "Lunch",
    title: "A Hidden Place",
    text: "For lunch, we settle into one of my favorite local restaurants, hidden inside a beautiful garden with an amazing menu. Here we take our time, continue our conversation and enjoy the slower rhythm of the day."
  },
  {
    time: "Afternoon",
    title: "Following Curiosity",
    text: "In the afternoon, we continue exploring the streets together. Maybe we step into a small museum, discover a hidden courtyard or stop by my favorite chocolate shop. Some of the best moments are the ones we never planned."
  },
  {
    time: "Late Afternoon",
    title: "The City from the Water",
    text: "At the end of the day, we step aboard a private boat and we can enjoy a glass of wine. As the light begins to reflect on the canals and the city slowly softens, Amsterdam somehow feels different again. Usually, that's the moment people truly start to feel the city."
  }
];
const reviews = [
  {
    quote: "Two wonderful days of walking, eating at favorite restaurants, touring the canals, and visiting the Rijks and Van Gogh museums…",
    author: "James E.",
    location: "Rick Steves traveller",
    date: "March 2026"
  },
  {
    quote: "Knowledgeable and very personable. If we were to return we would book Dennis again just for the pleasure of his company…",
    author: "Paul J.",
    location: "United States",
    date: "July 2025"
  },
  {
    quote: "If I could give Dennis 10++ stars I would. One of the best guides we have ever had the pleasure of knowing…",
    author: "Brynn & Bill",
    location: "United States",
    date: "September 2023"
  },
  {
    quote: "Welcoming, kind and enthusiastic. He gave us a walking tour of Amsterdam, drove us to the tulip fields, and took us to the museums…",
    author: "Melanie D.",
    location: "Keller, Texas",
    date: "April 2024"
  },
  {
    quote: "Dennis took us off the beaten path and showed us the Amsterdam locals know. We finished the day feeling like we'd made a friend, not hired a guide…",
    author: "Sarah & Tom",
    location: "United Kingdom",
    date: "May 2025"
  },
  {
    quote: "From the moment we connected by email, Dennis was attentive and thoughtful. The day itself flowed effortlessly. We can't recommend him highly enough…",
    author: "Linda H.",
    location: "Australia",
    date: "October 2024"
  }
];
const Index = () => {
  const t = useSiteContent();
  const [openInterest, setOpenInterest] = useState(null);
  const navigate = useNavigate();
  const podcastRef = useRef(null);
  const { data: bookStories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stories").select("id, slug, title, intro, body, image_path").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((s) => ({
        id: s.slug,
        title: s.title,
        intro: s.intro,
        body: s.body
      }));
    }
  });
  return /* @__PURE__ */ jsxs("main", { className: "relative z-10", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Dennis Gerrits – Personal Travel Companion in Amsterdam" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Discover Amsterdam with Dennis Gerrits, a personal travel companion and storyteller who walks alongside you and shows the city the way a friend would."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://dennisgerrits.com/" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Dennis Gerrits – Personal Travel Companion in Amsterdam" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "A personal, trust-based way of experiencing Amsterdam, guided by someone who feels like a friend."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://dennisgerrits.com/" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: "Dennis Gerrits",
            url: "https://dennisgerrits.com/",
            description: "A personal, trust-based way of experiencing Amsterdam, guided by someone who feels like a friend."
          },
          {
            "@type": "Person",
            name: "Dennis Gerrits",
            jobTitle: "Travel Companion & Storyteller",
            url: "https://dennisgerrits.com/",
            description: "Dennis Gerrits is a personal travel companion and storyteller in Amsterdam.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Amsterdam",
              addressCountry: "NL"
            }
          }
        ]
      }) })
    ] }),
    /* @__PURE__ */ jsx(AmsterdamSkyline, {}),
    /* @__PURE__ */ jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-10 md:pt-14 lg:pt-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-center mb-4 lg:mb-6", children: /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary", children: "About me" }) }) }) }) }),
    /* @__PURE__ */ jsx(AboutCarousel, {}),
    /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "py-16 md:py-20 lg:py-32 scroll-mt-20", style: { backgroundColor: "hsl(var(--heritage-taupe-tint))" }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-center mb-16 lg:mb-20", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary mb-6", children: t("process.kicker", "How I Work") }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6", children: t("process.title", "Every journey starts with a conversation. Every experience is shaped around you.") }),
        /* @__PURE__ */ jsx(
          RichText,
          {
            className: "font-body text-lg text-muted-foreground leading-relaxed",
            html: t("process.intro", ""),
            fallback: "From the first message to the last goodbye, you’ll always have someone local by your side."
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(FadeIn, { delay: 0.05, children: /* @__PURE__ */ jsx("div", { className: "flex justify-center -mt-10 mb-16 lg:mb-20", children: /* @__PURE__ */ jsx("svg", { width: "192", height: "16", viewBox: "0 0 200 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M2 18C25.5 2.5 54.5 2 78 8.5C101.5 15 130.5 17.5 154 11C177.5 4.5 198 2 198 2",
          stroke: "hsl(var(--heritage-orange))",
          strokeWidth: "2",
          strokeLinecap: "round"
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(FadeIn, { delay: 0.1, children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto mb-24 lg:mb-32", children: (() => {
        const steps = [
          { n: "01", label: t("process.step1.label", "Let’s Connect"), text: t("process.step1.text", "You reach out, and we plan a personal video call to get to know each other and your travel plans.") },
          { n: "02", label: t("process.step2.label", "Getting to Know You"), text: t("process.step2.text", "I take the time to listen. Your interests, travel style and wishes help shape the experience.") },
          { n: "03", label: t("process.step3.label", "Creating Your Journey"), text: t("process.step3.text", "Together, we shape an experience that feels personal and completely tailored to you.") },
          { n: "04", label: t("process.step4.label", "I Take Care of the Details"), text: t("process.step4.text", "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of.") }
        ];
        return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8", children: steps.map((step, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `text-center md:text-left ${i % 2 === 1 ? "md:mt-16" : ""}`,
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "block text-6xl leading-none mb-3 text-[hsl(var(--heritage-orange))]",
                  style: { fontFamily: "'Caveat', cursive", fontWeight: 700 },
                  children: step.n
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-2xl md:text-[1.65rem] tracking-wide text-primary leading-tight mb-3 uppercase", children: step.label }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-base text-muted-foreground leading-relaxed", children: step.text })
            ]
          },
          step.n
        )) });
      })() }) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: (() => {
        const rows = [
          { icon: iconTickets, title: t("concierge.tickets.title", "Museum Reservations"), desc: t("concierge.tickets.desc", "Including tickets and timed entry reservations for museums and cultural experiences.") },
          { icon: iconDining, title: t("concierge.dining.title", "Dining Reservations"), desc: t("concierge.dining.desc", "Thoughtfully selected places to eat, from local favorites to memorable dining experiences.") },
          { icon: iconTransport, title: t("concierge.transport.title", "Transportation Coordination"), desc: t("concierge.transport.desc", "Help arranging transportation, including airport transfers and train tickets.") },
          { icon: iconHotel, title: t("concierge.hotel.title", "Hotel & B&B Recommendations"), desc: t("concierge.hotel.desc", "Helping you find the place and neighborhood that fit your travel style best.") },
          { icon: iconMessage, title: t("concierge.support.title", "Guidance & Support"), desc: t("concierge.support.desc", "Always available for questions, practical help and personal support throughout your stay.") }
        ];
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 md:mb-12", children: [
            /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-accent mb-4", children: t("concierge.kicker", "What I take care of") }),
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[0.95] uppercase", children: t("concierge.title", "More than a guide. Personal support, thoughtful guidance and local knowledge throughout your stay.") })
          ] }) }),
          /* @__PURE__ */ jsx(FadeIn, { delay: 0.2, children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-background rounded-sm shadow-sm overflow-hidden",
              style: { borderTop: "4px solid hsl(var(--heritage-orange))" },
              children: /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border/40", children: rows.map((row) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-5 px-6 py-6 md:px-10 md:py-7", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                    style: { backgroundColor: "hsl(var(--heritage-taupe) / 0.2)" },
                    "aria-hidden": true,
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: row.icon,
                        alt: "",
                        className: "w-6 h-6 object-contain",
                        loading: "lazy",
                        "aria-hidden": true
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-heading text-lg md:text-xl text-primary tracking-wide uppercase leading-tight mb-1", children: row.title }),
                  /* @__PURE__ */ jsx("p", { className: "font-body text-sm md:text-base text-muted-foreground leading-relaxed", children: row.desc })
                ] })
              ] }, row.title)) })
            }
          ) })
        ] });
      })() })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "day", className: "relative scroll-mt-20 pt-12 lg:pt-20 pb-16 md:pb-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-6 lg:mb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-xs lg:text-sm tracking-widest uppercase text-secondary mb-2", children: "Let's Explore Together" }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-3", children: "A Day in My Amsterdam" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-base text-muted-foreground leading-relaxed", children: "Every day unfolds differently. Shaped by curiosity, conversation and the rhythm of the city. Tap a number on the map to peek into a moment of the day." })
      ] }) }),
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx(DayMap, { moments }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "rick-steves", className: "relative py-14 md:py-20 lg:py-28 scroll-mt-20", style: { backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: dennisRickSteves,
              alt: "Dennis Gerrits with travel writer Rick Steves on an Amsterdam canal, holding the Rick Steves Amsterdam & The Netherlands guidebook",
              className: "w-full h-auto rounded-sm shadow-xl object-cover"
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "mt-3 text-base italic",
              style: {
                fontFamily: "'Caveat', 'Outfit', cursive",
                color: "hsl(var(--heritage-bordeaux))"
              },
              children: "Sharing stories with Rick Steves along the canals of Amsterdam."
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, children: /* @__PURE__ */ jsxs("div", { className: "lg:pt-16", children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-accent mb-6", children: "Featured By" }),
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl text-primary leading-[0.95] mb-6", children: "Rick Steves" }),
          /* @__PURE__ */ jsxs("blockquote", { className: "relative font-body text-lg sm:text-xl text-foreground italic leading-relaxed mb-6 pl-7 sm:pl-10", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": true,
                className: "absolute -left-1 sm:-left-2 -top-5 sm:-top-6 font-heading text-5xl sm:text-7xl leading-none select-none",
                style: { color: "hsl(var(--heritage-green))" },
                children: "“"
              }
            ),
            "Dennis is the kind of local guide every traveler dreams of finding. He doesn't just show you Amsterdam. He makes you feel like you belong there."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-foreground/80 leading-relaxed mb-8", children: "Since 2018, Dennis has been featured in Rick Steves’ Amsterdam & the Netherlands guidebook and invited back for three podcast conversations, where Rick turned to Dennis for his trusted perspective on Amsterdam, its culture, and the people who call it home." }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary mb-4", children: "In conversation with Rick Steves" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
            {
              date: "April 27, 2024",
              title: "Program 752",
              url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-752"
            },
            {
              date: "August 26, 2023",
              title: "Program 725",
              url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-725"
            },
            {
              date: "May 13, 2023",
              title: "Program 714",
              url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-714"
            }
          ].map((ep) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: ep.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 hover:border-accent transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-heading text-lg text-primary group-hover:text-accent transition-colors", children: ep.title }),
                /* @__PURE__ */ jsx("span", { className: "font-body text-sm text-muted-foreground", children: ep.date })
              ]
            }
          ) }, ep.url)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 lg:mt-24 max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10 md:mb-12", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "font-body text-[10px] md:text-[11px] tracking-[0.35em] uppercase whitespace-nowrap",
              style: { color: "hsl(var(--heritage-orange))" },
              children: "In the Media"
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": true,
              className: "flex-1 h-px",
              style: { background: "hsl(var(--border))" }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start", children: [
          /* @__PURE__ */ jsx(FadeIn, { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[0.95] tracking-wide", children: "Radio Interview about Amsterdam" }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl", children: "I was invited to speak on Dutch radio about Amsterdam, its culture, the people who shape its neighbourhoods and what it means to share the city with visitors. The interview is in Dutch. I'm honored to have been featured as a local voice." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-sm overflow-hidden border border-border/60 shadow-sm", children: /* @__PURE__ */ jsx(
              "iframe",
              {
                title: "Dennis Gerrits – Radio interview about Amsterdam (SoundCloud)",
                width: "100%",
                height: "140",
                scrolling: "no",
                frameBorder: "no",
                allow: "autoplay",
                src: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftaboe-media%2Fdennis-gerrits-i-love-my-city&color=%23b8651a&inverse=false&auto_play=false&show_user=true"
              }
            ) }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://soundcloud.com/taboe-media/dennis-gerrits-i-love-my-city",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 font-body text-sm font-medium hover:gap-3 transition-all",
                style: { color: "hsl(var(--heritage-orange))" },
                children: [
                  "Listen on SoundCloud",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: [
              "Neighbourhood life",
              "Canals",
              "Local culture",
              "Living in Amsterdam"
            ].map((topic) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block font-body text-xs px-3 py-1.5 rounded-sm border",
                style: {
                  color: "hsl(var(--heritage-purple))",
                  borderColor: "hsl(var(--heritage-taupe-soft))",
                  background: "hsl(var(--heritage-taupe-tint))"
                },
                children: topic
              },
              topic
            )) })
          ] }) }),
          /* @__PURE__ */ jsx(FadeIn, { delay: 0.04, className: "lg:col-span-5", children: /* @__PURE__ */ jsxs("figure", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-sm shadow-md", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: lovableAssetUrl(dennisRadioTaboe.url),
                alt: "Dennis Gerrits being interviewed live at Taboe Media radio studio on Zeedijk, Amsterdam",
                loading: "lazy",
                className: "w-full aspect-[4/5] object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("figcaption", { className: "font-body text-xs md:text-sm text-muted-foreground italic flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: "w-8 h-px",
                  style: { background: "hsl(var(--heritage-orange))" }
                }
              ),
              "Live at Taboe Media, Zeedijk – Amsterdam."
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(FadeIn, { delay: 0.08, className: "lg:col-span-12", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#contact",
              className: "group block relative overflow-hidden rounded-sm p-6 md:p-10 lg:p-12 transition-all hover:shadow-lg",
              style: { background: "hsl(var(--heritage-purple))" },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": true,
                    className: "absolute top-4 right-4 md:top-5 md:right-5 font-body text-[9px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity",
                    style: {
                      color: "hsl(var(--heritage-orange))",
                      borderColor: "hsl(var(--heritage-orange))",
                      transform: "rotate(4deg)"
                    },
                    children: "GUEST"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-3 md:space-y-4", children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: "font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase",
                        style: { color: "hsl(var(--heritage-orange))" },
                        children: "Invite Dennis"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: "font-heading text-2xl sm:text-3xl md:text-4xl leading-[0.95] tracking-wide",
                        style: { color: "hsl(var(--heritage-cream))" },
                        children: "Podcasts · Lectures · Radio · Live Events"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: "font-body text-sm md:text-base leading-relaxed max-w-lg",
                        style: { color: "hsl(var(--heritage-taupe-tint))" },
                        children: "Available for podcast conversations, guest lectures, interviews, and cultural programs."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-2 font-body text-sm font-bold tracking-widest uppercase group-hover:gap-3 transition-all md:flex-shrink-0",
                      style: { color: "hsl(var(--heritage-orange))" },
                      children: [
                        "Get in touch",
                        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-20 md:py-24 lg:py-28 overflow-hidden",
        style: {
          background: "radial-gradient(900px 600px at 100% 110%, hsl(var(--heritage-green) / 0.12), transparent 65%), hsl(var(--background))"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "pointer-events-none absolute inset-0 opacity-[0.04]",
              style: {
                backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "22px 22px"
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-6 lg:px-12", children: [
            /* @__PURE__ */ jsx("div", { className: "max-w-3xl mb-12 lg:mb-16", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "mb-3 text-2xl md:text-3xl",
                  style: {
                    fontFamily: "'Caveat', cursive",
                    color: "hsl(var(--heritage-green))",
                    transform: "rotate(-2deg)",
                    display: "inline-block"
                  },
                  children: "Some ideas to inspire your journey"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "font-body text-sm tracking-widest uppercase mb-6",
                  style: { color: "hsl(var(--heritage-orange))" },
                  children: "Threads to follow"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6", children: "What draws you in?" }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-lg text-muted-foreground leading-relaxed", children: "No two journeys are ever the same. These are a few places where they often begin." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-4", children: [
              { id: "neighbourhood", title: "The Neighbourhood Way", note: "real Amsterdam lives here", caption: "Quiet side streets where everyday life unfolds. Someone watering plants outside their front door. A neighbour locking up a bicycle.", image: imgNeighbourhood, rotate: -2.4, pin: "tape-tl" },
              { id: "food", title: "Food Culture", note: "one bite at a time", caption: "Morning markets full of daily life. The smell of fresh bread from bakeries. Local flavours in every bite.", image: imgFood, rotate: 1.8, pin: "tape-tr" },
              { id: "architecture", title: "Living Architecture", note: "unlike anywhere else", caption: "A city built in layers of time. Old and modern architecture side by side. Every building carries its own story.", image: imgArchitecture, rotate: -1.2, pin: "tape-gl" },
              { id: "water", title: "From the Water", note: "a different rhythm", caption: "On a private boat through quiet canals. The city unfolding around you. A picnic, wine, and shared moments.", image: imgWater, rotate: 2, pin: "tape-gr" }
            ].map((theme, i) => {
              const paperPalette = [
                "hsl(40 38% 97%)",
                "hsl(120 22% 92%)",
                "hsl(22 70% 92%)",
                "hsl(350 35% 92%)"
              ];
              const paperBg = paperPalette[i % paperPalette.length];
              const isLeft = theme.pin === "tape-tl" || theme.pin === "tape-gl";
              const tapeColors = [
                { bg: "hsl(var(--heritage-orange) / 0.72)", border: "hsl(var(--heritage-bordeaux) / 0.30)" },
                { bg: "hsl(var(--heritage-green) / 0.55)", border: "hsl(var(--heritage-green) / 0.40)" },
                { bg: "hsl(var(--heritage-bordeaux) / 0.45)", border: "hsl(var(--heritage-bordeaux) / 0.35)" }
              ];
              const tape = tapeColors[i % 3];
              const outlineColors = [
                "hsl(var(--heritage-orange))",
                "hsl(var(--heritage-green))",
                "hsl(var(--heritage-purple))"
              ];
              const outlineColor = outlineColors[i % 3];
              const sketchVariants = [
                [
                  "M 3 4 C 22 2.5, 48 4, 70 2.8 S 96 3.4, 97.5 5 C 98.6 26, 96.8 50, 98 74 C 98.4 92, 97.5 97, 95.5 97.6 C 74 98.8, 50 97.2, 26 98.6 C 9 99, 3 98, 2.5 95.5 C 1.4 75, 3.2 50, 1.8 26 C 1.4 8, 2.2 3, 4 3.4 Z",
                  "M 4 3 C 24 4, 50 2.6, 72 4.2 S 97 4.6, 96.6 6.2 C 97.8 27, 98.6 51, 96.8 75 C 96.4 93, 97.8 96.4, 95 97.4 C 73 97, 49 98.6, 25 96.8 C 8 96.4, 4 97, 3.6 94 C 2.6 74, 1.6 49, 3 25 C 3.4 7, 3 4, 4.4 3.2 Z"
                ],
                [
                  "M 2.5 5 C 26 3.6, 52 5.2, 74 3.4 S 97 4.2, 97 6.4 C 96 28, 98.4 52, 97.2 76 C 97 91, 96 97.8, 94 97 C 72 98, 48 96.6, 24 98 C 7 98.6, 3 97.4, 3.4 94.4 C 2 74, 4 48, 2.4 24 C 2 6, 2.6 4, 4.6 4 Z",
                  "M 5 4 C 28 5.4, 54 3, 75 5.4 S 96 5.6, 95.8 7.4 C 96.6 28, 97 53, 96 77 C 95.6 92, 96.4 95.8, 93.6 96.8 C 71 96.4, 47 98, 23 96.4 C 7 96, 4.4 96.6, 4.4 93.4 C 3.4 73, 2 48, 3.6 24 C 4 6.6, 4 4.4, 5.2 4 Z"
                ],
                [
                  "M 3.4 3 C 23 4.4, 49 2.4, 71 4 S 96.4 2.8, 98 4.4 C 99 27, 97.4 51, 98.6 75 C 99 93, 96.6 97.4, 94.4 98 C 73 98.4, 49 96.6, 25 98 C 8 98.4, 2 98, 2.8 95 C 1 75, 3.6 49, 2 25 C 1.6 8, 2.4 2.6, 4.4 3 Z",
                  "M 4.6 4.4 C 25 3, 51 4.6, 73 3 S 96 6, 96.4 7.2 C 97.4 28, 98.8 52, 97 76 C 96.6 92, 97.4 96, 94.6 97 C 73 97.6, 49 98, 25 96.4 C 9 96, 4 97.6, 3.6 94.6 C 2.4 74, 1.4 49, 3 25 C 3.4 7, 3 4.4, 4.4 4 Z"
                ],
                [
                  "M 3 3.4 C 24 2, 47 4.4, 69 3 S 95 4, 97.6 5.4 C 98 26, 97.6 50, 98.4 75 C 98.6 93, 96.6 96, 95 97 C 75 99, 51 97.6, 27 99 C 9 98.6, 2.6 97.4, 2.6 95 C 1.6 76, 2.6 51, 1.4 26 C 1.6 7, 2 3.4, 4 3 Z",
                  "M 4.4 4 C 26 5, 52 3.4, 74 4.6 S 96.4 4, 96 6 C 97 27, 98.4 50, 96.4 76 C 96.6 92, 97.6 95.6, 94.6 96.8 C 72 97.4, 48 99, 24 97 C 7 96.6, 4 97, 3.4 94 C 2.4 74, 1.6 48, 3.4 24 C 3.6 7, 2.6 4.4, 4.4 3.4 Z"
                ]
              ];
              const sketchPaths = sketchVariants[i % sketchVariants.length];
              return /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.08, children: /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => navigate(
                    `/get-inspired?theme=${encodeURIComponent(
                      theme.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                    )}`
                  ),
                  "aria-label": `${theme.title} — read more on the Experiences page`,
                  className: "group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4",
                  style: { transform: `rotate(${theme.rotate}deg)` },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        "aria-hidden": true,
                        className: "pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl",
                        style: {
                          background: "radial-gradient(closest-side, hsl(var(--heritage-orange) / 0.35), transparent 70%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "p-2.5 sm:p-3 pb-4 sm:pb-5 transition-all duration-500 relative", children: [
                      /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          "aria-hidden": true,
                          className: "absolute inset-0 w-full h-full pointer-events-none transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_22px_24px_rgba(0,0,0,0.28))]",
                          viewBox: "0 0 100 100",
                          preserveAspectRatio: "none",
                          style: {
                            color: outlineColor,
                            overflow: "visible",
                            filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
                          },
                          children: [
                            /* @__PURE__ */ jsx("path", { d: sketchPaths[0], fill: paperBg, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", style: { strokeWidth: "2.4px" } }),
                            /* @__PURE__ */ jsx("path", { d: sketchPaths[1], fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", style: { strokeWidth: "1.2px", opacity: 0.55 } })
                          ]
                        }
                      ),
                      i % 2 === 0 ? /* @__PURE__ */ jsx(
                        "span",
                        {
                          "aria-hidden": true,
                          className: `absolute top-1 sm:top-1.5 w-16 sm:w-20 h-5 sm:h-6 border z-10 shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${isLeft ? "left-3 sm:left-5 -rotate-[8deg]" : "right-3 sm:right-5 rotate-[6deg]"}`,
                          style: {
                            backgroundColor: tape.bg,
                            borderColor: tape.border
                          }
                        }
                      ) : /* @__PURE__ */ jsx(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full z-10 shadow-[inset_-1.5px_-2px_2.5px_rgba(0,0,0,0.4),inset_2px_2px_2.5px_rgba(255,255,255,0.55),0_3px_4px_rgba(0,0,0,0.4)]",
                          style: { backgroundColor: outlineColor }
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: theme.image,
                            alt: theme.title,
                            loading: "lazy",
                            decoding: "async",
                            className: `w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150 ${openInterest === theme.id ? "scale-105 blur-[2px]" : ""}`,
                            style: { filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: `absolute inset-0 flex flex-col justify-center px-4 sm:px-5 py-4 transition-opacity duration-500 ${openInterest === theme.id ? "opacity-100" : "opacity-0 pointer-events-none"}`,
                            style: {
                              background: `linear-gradient(180deg, ${paperBg} 0%, ${paperBg} 60%, ${paperBg}f2 100%)`
                            },
                            children: [
                              /* @__PURE__ */ jsx(
                                "p",
                                {
                                  className: "font-body text-sm sm:text-base leading-relaxed text-primary",
                                  children: theme.caption
                                }
                              ),
                              /* @__PURE__ */ jsxs(
                                Link,
                                {
                                  to: "/get-inspired",
                                  onClick: (e) => e.stopPropagation(),
                                  className: "mt-4 font-body text-xs sm:text-sm tracking-widest uppercase inline-flex items-center gap-1.5 self-start border-b border-dashed pb-0.5 transition-opacity hover:opacity-70",
                                  style: { color: "hsl(var(--heritage-orange))", borderColor: "hsl(var(--heritage-orange))" },
                                  children: [
                                    "Read more ",
                                    /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "relative mt-3 sm:mt-4 px-1.5 sm:px-2", children: [
                        /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide", children: theme.title }),
                        /* @__PURE__ */ jsxs(
                          "p",
                          {
                            className: "text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              color: "hsl(var(--heritage-bordeaux))"
                            },
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  "aria-hidden": true,
                                  className: "inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle",
                                  style: { backgroundColor: "hsl(var(--heritage-orange))" }
                                }
                              ),
                              theme.note
                            ]
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ) }, theme.id);
            }) }),
            /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx("p", { className: "text-center mt-16", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/get-inspired",
                className: "font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80 inline-flex items-center gap-2",
                style: {
                  color: "hsl(var(--heritage-orange))",
                  borderColor: "hsl(var(--heritage-orange))"
                },
                children: [
                  "Discover more",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
                ]
              }
            ) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        id: "podcast",
        className: "relative py-12 md:py-14 lg:py-16 scroll-mt-20 overflow-hidden",
        style: { backgroundColor: "hsl(var(--heritage-green))" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-screen",
              "aria-hidden": true,
              style: {
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.85  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12 relative", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center", children: [
            /* @__PURE__ */ jsxs(FadeIn, { className: "lg:col-span-8 lg:border-r lg:pr-10 lg:[border-color:hsl(0_0%_100%/0.15)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "inline-flex items-center justify-center w-6 h-6 rounded-full",
                    style: { backgroundColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-green))" },
                    "aria-hidden": true,
                    children: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                      /* @__PURE__ */ jsx("rect", { x: "9", y: "2", width: "6", height: "12", rx: "3" }),
                      /* @__PURE__ */ jsx("path", { d: "M5 10a7 7 0 0 0 14 0" }),
                      /* @__PURE__ */ jsx("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-body text-[11px] tracking-[0.3em] uppercase px-3 py-1 rounded-full border",
                    style: {
                      color: "hsl(var(--heritage-orange))",
                      borderColor: "hsl(var(--heritage-orange) / 0.5)"
                    },
                    children: "Podcast"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: "font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5",
                  style: { color: "hsl(0 0% 98%)" },
                  children: [
                    "Two Stories, One City",
                    /* @__PURE__ */ jsx("br", {}),
                    "Amsterdam"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "font-body italic text-base md:text-lg leading-relaxed mb-5",
                  style: { color: "hsl(var(--heritage-orange))" },
                  children: "A podcast by Louke and Dennis. Two locals in conversation with their city, inviting you to listen."
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "font-body text-base leading-relaxed mb-6", style: { color: "hsl(0 0% 88%)" }, children: "Stories about Amsterdam, identity, culture, city life and personal experiences, told through the people who shape the city." }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return (_a2 = podcastRef.current) == null ? void 0 : _a2.play();
                  },
                  className: "flex items-start gap-3 mb-6 text-left group",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors group-hover:bg-[hsl(var(--heritage-orange))] group-hover:text-[hsl(var(--heritage-green))]",
                        style: { borderColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-orange))" },
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsx(Play, { size: 16, fill: "currentColor" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("p", { className: "font-body text-base leading-snug", style: { color: "hsl(0 0% 94%)" }, children: [
                      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Start with Episode 0" }),
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsxs("span", { style: { color: "hsl(0 0% 82%)" }, children: [
                        "and step into the world of ",
                        /* @__PURE__ */ jsx("em", { children: "Two Stories, One City" }),
                        "."
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(PodcastPlayer, { ref: podcastRef, tone: "dark" })
            ] }),
            /* @__PURE__ */ jsxs(FadeIn, { className: "lg:col-span-4 flex flex-col items-center lg:items-start gap-6", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: podcastHosts,
                  alt: "Louke and Dennis, hosts of Two Stories, One City",
                  loading: "lazy",
                  className: "w-full max-w-[280px] h-auto rounded-sm shadow-lg object-cover aspect-[4/3]"
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://twostoriesonecity.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group flex items-start gap-3 transition-opacity hover:opacity-80",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "shrink-0 w-9 h-9 rounded-full border flex items-center justify-center mt-1",
                        style: { borderColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-orange))" },
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
                          /* @__PURE__ */ jsx("polyline", { points: "12 5 19 12 12 19" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "font-body text-sm md:text-base leading-snug", style: { color: "hsl(0 0% 92%)" }, children: [
                      "Listen to all episodes and",
                      /* @__PURE__ */ jsx("br", {}),
                      "join the journey at",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx("span", { className: "underline underline-offset-4", style: { color: "hsl(var(--heritage-orange))" }, children: "twostoriesonecity.com →" })
                    ] })
                  ]
                }
              )
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { id: "proof", className: "py-16 md:py-20 lg:py-32 scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12", children: [
      (() => {
        const TA_URL = "https://www.tripadvisor.com/Attraction_Review-g188590-d13431295-Reviews-Love_My_City_Tours-Amsterdam_North_Holland_Province.html";
        const TA_GREEN = "#00AA6C";
        const taRating = t("tripadvisor.rating", "5.0");
        const taReviewCount = parseInt(t("tripadvisor.review_count", "218"), 10) || 0;
        const TripAdvisorBubbles = ({ size: size2 = 14 }) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "inline-flex items-center gap-1",
            "aria-label": "5 of 5 bubbles",
            children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "block rounded-full",
                style: {
                  width: size2,
                  height: size2,
                  backgroundColor: TA_GREEN
                }
              },
              i
            ))
          }
        );
        const TripAdvisorWordmark = ({
          className = ""
        }) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `font-heading tracking-wide ${className}`,
            style: { color: TA_GREEN },
            children: "Tripadvisor"
          }
        );
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mb-12", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
            /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary mb-6", children: "Stories from my guests" }),
            /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8", children: "Real Words From Real People" }),
            /* @__PURE__ */ jsxs("p", { className: "font-body text-base md:text-lg text-muted-foreground leading-relaxed md:whitespace-nowrap", children: [
              "These are words shared by travelers after their time with me. Click any card to read the full review on ",
              /* @__PURE__ */ jsx(TripAdvisorWordmark, { className: "text-lg" }),
              "."
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-10 max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsx(FadeIn, { className: "md:col-span-4 lg:col-span-3", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: TA_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex md:flex-col items-center md:items-start gap-4 md:gap-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all px-6 py-4 md:py-5 border border-border",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "flex items-center justify-center rounded-full text-white font-heading text-xl shrink-0",
                      style: {
                        backgroundColor: TA_GREEN,
                        width: 44,
                        height: 44
                      },
                      "aria-hidden": "true",
                      children: "◉"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(TripAdvisorWordmark, { className: "text-xl" }),
                      /* @__PURE__ */ jsx("span", { className: "font-body text-sm text-muted-foreground", children: "Rating" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
                      /* @__PURE__ */ jsx(TripAdvisorBubbles, {}),
                      /* @__PURE__ */ jsxs("span", { className: "font-body text-sm text-foreground", children: [
                        /* @__PURE__ */ jsx("strong", { children: taRating }),
                        " · ",
                        taReviewCount,
                        " reviews"
                      ] })
                    ] })
                  ] })
                ]
              }
            ) }),
            (() => {
              const hero = reviews[0];
              return /* @__PURE__ */ jsx(FadeIn, { className: "md:col-span-8 lg:col-span-9", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: TA_URL,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group block bg-background rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 px-6 sm:px-10 md:px-10 py-8 sm:py-10 md:py-10 relative",
                  style: { borderLeftColor: "hsl(var(--heritage-green))" },
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        "aria-hidden": true,
                        className: "absolute -left-1 -top-5 sm:-top-6 font-heading text-6xl sm:text-7xl md:text-8xl leading-none select-none",
                        style: { color: "hsl(var(--heritage-green))" },
                        children: "“"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 gap-3 flex-wrap", children: [
                      /* @__PURE__ */ jsx(TripAdvisorBubbles, { size: 16 }),
                      /* @__PURE__ */ jsxs(
                        "span",
                        {
                          className: "font-body text-xs tracking-wide uppercase opacity-80",
                          style: { color: TA_GREEN },
                          children: [
                            "Tripadvisor · ",
                            hero.date
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "font-heading text-xl sm:text-2xl md:text-2xl lg:text-3xl text-primary leading-snug italic mb-6", children: hero.quote }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "font-body text-sm font-medium text-primary", children: hero.author }),
                        /* @__PURE__ */ jsx("p", { className: "font-body text-xs text-muted-foreground", children: hero.location })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "font-body text-xs tracking-wide opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",
                          style: { color: TA_GREEN },
                          children: "Read on Tripadvisor →"
                        }
                      )
                    ] })
                  ]
                }
              ) });
            })()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0", children: [
            /* @__PURE__ */ jsx("div", { className: "flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8 max-w-6xl mx-auto min-w-max md:min-w-0", children: reviews.slice(1).map((r, i) => {
              const spans = ["lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-5"];
              const align = i % 2 === 0 ? "text-left" : "text-left md:text-right";
              return /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.08, children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: TA_URL,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: `group bg-background rounded-lg p-5 h-full flex flex-col shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-4 snap-start w-[280px] md:w-auto ${spans[i] ?? ""} ${align}`,
                  style: { borderTopColor: TA_GREEN },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-2 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`, children: [
                      /* @__PURE__ */ jsx(TripAdvisorBubbles, { size: 12 }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "font-body text-xs tracking-wide uppercase opacity-70 group-hover:opacity-100 transition-opacity",
                          style: { color: TA_GREEN },
                          children: "Tripadvisor"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "font-body text-[11px] text-muted-foreground mb-2", children: [
                      "Reviewed ",
                      r.date
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-foreground leading-snug italic flex-1", children: [
                      '"',
                      r.quote,
                      '"'
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "mt-3 pt-3 border-t border-border flex items-end justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-body text-xs font-medium text-primary", children: r.author }),
                      /* @__PURE__ */ jsx("p", { className: "font-body text-[11px] text-muted-foreground", children: r.location })
                    ] }) })
                  ]
                }
              ) }, i);
            }) }),
            /* @__PURE__ */ jsx("style", { children: `
                    .overflow-x-auto::-webkit-scrollbar { display: none; }
                    .overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
                  ` })
          ] }),
          /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center text-center mb-12", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: TA_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "font-body text-sm tracking-widest uppercase border-b pb-1 transition-colors",
              style: {
                color: TA_GREEN,
                borderColor: `${TA_GREEN}66`
              },
              children: [
                "Read all ",
                taReviewCount,
                " reviews on Tripadvisor →"
              ]
            }
          ) }) })
        ] });
      })(),
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "mt-20 lg:mt-28", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-8", children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-accent mb-4", children: "Shared Moments" }),
          /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-4", children: "Memories made together" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground text-lg leading-relaxed", children: "Moments of connection created with people from all around the world." })
        ] }),
        /* @__PURE__ */ jsx(MosaicWall, { photos: guestPhotos })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(ContactSection, {}),
    /* @__PURE__ */ jsx(
      "section",
      {
        id: "around-friends",
        className: "relative py-16 md:py-20 lg:py-24 scroll-mt-20 overflow-hidden",
        style: { backgroundColor: "hsl(40 38% 96%)" },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-body text-sm tracking-widest uppercase mb-4",
              style: { color: "hsl(var(--heritage-orange))" },
              children: "Co-Founder Projects"
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8", children: "AroundFriends" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-lg text-foreground/85 leading-relaxed mb-5", children: "In addition to my work as a travel advisor and local guide in Amsterdam and the Netherlands, I am the co-founder and Guide Community Director of AroundFriends." }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-base text-muted-foreground leading-relaxed mb-5", children: "AroundFriends is a guide-matching platform that connects travelers with carefully selected local guides. Travelers complete a short questionnaire and are then matched with guides who fit their travel style and interests. They can explore detailed guide profiles, watch personal introduction videos, and connect directly with guides before booking, creating a more personal and transparent way to plan meaningful travel experiences." }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-base text-muted-foreground leading-relaxed mb-8", children: "The platform was born from a shared belief that travel becomes more meaningful when it is built on genuine human connection and local insight." }),
          /* @__PURE__ */ jsxs(
            "blockquote",
            {
              className: "relative pl-6 border-l-4 py-2 mb-8",
              style: { borderColor: "hsl(var(--heritage-bordeaux))" },
              children: [
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "font-body italic text-lg leading-relaxed",
                    style: { color: "hsl(var(--heritage-bordeaux))" },
                    children: "“The brainchild of recommended guide Dennis Gerrits.”"
                  }
                ),
                /* @__PURE__ */ jsx("footer", { className: "font-body text-sm tracking-widest uppercase mt-3 text-muted-foreground", children: "Rick Steves Amsterdam & the Netherlands Guidebook, 2025 edition" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.aroundfriends.com/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-opacity hover:opacity-80",
              style: {
                color: "hsl(var(--heritage-bordeaux))",
                borderColor: "hsl(var(--heritage-bordeaux) / 0.5)"
              },
              children: [
                "Visit aroundfriends.com",
                /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
              ]
            }
          )
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        id: "storybook",
        className: "relative py-16 md:py-20 lg:py-28 scroll-mt-20 overflow-hidden",
        children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 lg:px-12", children: [
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mb-10 md:mb-14", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "font-body text-sm tracking-widest uppercase mb-4",
                style: { color: "hsl(var(--heritage-bordeaux))" },
                children: "Notes From the City"
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-4", children: "From my notebook" }),
            /* @__PURE__ */ jsx("p", { className: "font-body text-lg text-muted-foreground leading-relaxed", children: "Short reflections about Amsterdam. The kind of things I'd tell you over a coffee." })
          ] }) }),
          /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx(StoryBook, { stories: bookStories }) }),
          bookStories.length > 0 && /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx("div", { className: "mt-12 md:mt-16 text-center", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/notebook",
              className: "inline-flex items-center gap-2 font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-opacity hover:opacity-80",
              style: {
                color: "hsl(var(--heritage-bordeaux))",
                borderColor: "hsl(var(--heritage-bordeaux) / 0.5)"
              },
              children: [
                "Read all ",
                bookStories.length,
                " chapters in the notebook",
                /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
              ]
            }
          ) }) })
        ] })
      }
    )
  ] });
};
const imgHistory = "/assets/history-C8AZChzY.jpg";
const imgArt = "/assets/art-C1RMAqw2.jpg";
const imgNature = "/assets/nature-C-QCYJtM.jpg";
const imgCycling = "/assets/cycling-BQCEgvoz.jpg";
const imgTulips = "/assets/tulips-Gzp23CyO.jpg";
const imgHeritageMemory = "/assets/heritage-memory-JDvcTWWl.jpg";
const imgLeiden = "/assets/leiden-BYNigMgh.jpg";
const imgCountryside = "/assets/countryside-55tPQ683.jpg";
const imgRotterdam = "/assets/rotterdam-Q6E9xrE_.jpg";
const imgDelft = "/assets/delft-DBorxCuH.jpg";
const imgBrownCafe = "/assets/brown-cafe-hAtB_XJ0.jpg";
const imgVanGogh = "/assets/vangogh-qhPBvt6S.jpg";
const imgHaarlem = "/assets/haarlem-CtjdzBqY.jpg";
const imgRembrandt = "/assets/rembrandt-BdQDqqzA.jpg";
const imgQuietCorners = "/assets/quiet-corners-CPW8WRLy.jpg";
const imgShapedByWater = "/assets/shaped-by-water-CYIDUqVr.jpg";
(_E = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _E.call(globalThis, "src/pages/GetInspired.tsx");
const blocks = [
  {
    title: "The Neighbourhood Way",
    note: "real Amsterdam lives here",
    caption: "Quiet side streets where everyday life unfolds. Someone watering plants outside their front door. A neighbour locking up a bicycle.",
    image: imgNeighbourhood
  },
  {
    title: "Rembrandt and the Golden Age Stories",
    note: "the city that painted itself into history",
    caption: "Rembrandt and his living light. Rijksmuseum walls full of time and memory. Golden Age architecture where history still breathes.",
    image: imgRembrandt
  },
  {
    title: "Food Culture",
    note: "where you taste Amsterdam, one bite at a time",
    caption: "Morning markets full of daily life. The smell of fresh bread from bakeries. Local flavours in every bite.",
    image: imgFood
  },
  {
    title: "Slow Evenings",
    note: "when Amsterdam turns quiet and cozy",
    caption: "Brown cafés where time disappears. Locals settling into their night. Small restaurants that feel like home.",
    image: imgBrownCafe
  },
  {
    title: "From the Water",
    note: "seeing the city in a different rhythm",
    caption: "On a private boat through quiet canals. The city unfolding around you. A picnic, wine, and shared moments.",
    image: imgWater
  },
  {
    title: "Living Architecture",
    note: "unlike anywhere else in the world",
    caption: "A city built in layers of time. Old and modern architecture side by side. Every building carries its own story.",
    image: imgArchitecture
  },
  {
    title: "Stories of History",
    note: "feel how time has passed through Amsterdam",
    caption: "So many lives have shaped this city. History still lives in every street. 750 years of change.",
    image: imgHistory
  },
  {
    title: "Van Gogh Creates",
    note: "see the world through his eyes",
    caption: "Van Gogh Museum, where his work lives. His art is also found in the Kröller-Müller Museum. A life shaped by colour and emotion.",
    image: imgVanGogh
  },
  {
    title: "On Two Wheels",
    note: "experience Amsterdam like the locals do",
    caption: "Feel the freedom of movement. Bikes shape the city's DNA. It's a way of life for locals.",
    image: imgCycling
  },
  {
    title: "Heritage of Memory",
    note: "Jewish history and World War II in Amsterdam",
    caption: "Jewish life through the centuries. Stories of survival, courage and resistance. The impact of World War II on the city.",
    image: imgHeritageMemory
  },
  {
    title: "Art Scene",
    note: "a vibrant art world in Amsterdam",
    caption: "Artists shaping the city. Streets full of galleries and antique stores. Graffiti and art in public spaces.",
    image: imgArt
  },
  {
    title: "Gardens & Green Spaces",
    note: "a greener side of Amsterdam",
    caption: "Hidden gardens and botanical gardens in the city. Beautiful parks where people gather and enjoy life. Quiet spaces to relax and unwind.",
    image: imgNature
  },
  {
    title: "Quiet Corners",
    note: "benches where Amsterdam slows down",
    caption: "Sit and watch the city pass by. Rest, enjoy and just be. Share stories with locals nearby.",
    image: imgQuietCorners
  },
  {
    title: "Shaped by Water",
    note: "how the Netherlands lives with water every day",
    caption: "A constant fight with water. Continuous innovation in water management. Cities built around water systems.",
    image: imgShapedByWater
  },
  {
    title: "The Dutch Countryside",
    note: "step into a living postcard",
    caption: "Endless farmlands stretching to the horizon. Colourful houses, windmills and waterlands. A quiet rhythm of rural life.",
    image: imgCountryside
  },
  {
    title: "Tulip Season",
    note: "in spring, the landscape blooms even brighter",
    caption: "Tulip fields in endless bloom. Keukenhof Gardens, wandering among countless flowers. A vibrant mix of colours and scents that stays with you forever.",
    image: imgTulips
  },
  {
    title: "Haarlem",
    note: "home of Frans Hals and hidden beauty",
    caption: "Close to Amsterdam, different in spirit. Frans Hals Museum, see the master at work. A city of courtyards, quiet streets and timeless elegance.",
    image: imgHaarlem
  },
  {
    title: "Leiden",
    note: "birthplace of Rembrandt and rich in history",
    caption: "Centuries of stories along its beautiful canals. The Netherlands' oldest university city. Home to many Pilgrim Fathers before the Mayflower voyage.",
    image: imgLeiden
  },
  {
    title: "Rotterdam",
    note: "where innovation, architecture and creativity meet",
    caption: "A city reinvented through vision and design. Bold architecture and a modern skyline. Where the future is already taking shape.",
    image: imgRotterdam
  },
  {
    title: "Delft & The Hague",
    note: "Dutch history, royalty and art together",
    caption: "The Hague, royal palaces and political power. Delft, home of Vermeer and Delft Blue porcelain. Two iconic cities shaped by centuries of culture.",
    image: imgDelft
  }
];
const rotations = [-2.4, 1.8, -1.2, 2.2, -1.6, 1.4, -2, 1.6];
const pins = ["tape-tl", "tape-tr", "tape-gl", "tape-gr"];
const themes = blocks.map((b, i) => ({
  id: `block-${i + 1}`,
  slug: b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: b.title,
  caption: b.caption,
  note: b.note,
  image: b.image,
  rotate: rotations[i % rotations.length],
  pin: pins[i % pins.length]
}));
const GetInspired = () => {
  const [active, setActive] = useState(null);
  const [searchParams] = useSearchParams();
  const cardRefs = useRef({});
  const requestedSlug = searchParams.get("theme");
  useEffect(() => {
    if (!requestedSlug) {
      window.scrollTo(0, 0);
      return;
    }
    const match = themes.find((t) => t.slug === requestedSlug);
    if (!match) {
      window.scrollTo(0, 0);
      return;
    }
    setActive(match.id);
    const timer = window.setTimeout(() => {
      var _a2;
      (_a2 = cardRefs.current[match.id]) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [requestedSlug]);
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Amsterdam Experience Inspiration | Dennis Gerrits" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Themes and threads to shape your days in Amsterdam: neighbourhood life, water, food culture, art, architecture, gardens and quiet corners."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://dennisgerrits.com/get-inspired" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Amsterdam Experience Inspiration" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Themes and threads to shape your days in Amsterdam, from neighbourhood life and water to art, food culture and quiet corners."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://dennisgerrits.com/get-inspired" })
    ] }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 overflow-hidden",
        style: { backgroundColor: "hsl(var(--heritage-green))" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-screen",
              "aria-hidden": true,
              style: {
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.85  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "mb-3 text-2xl md:text-3xl",
                style: {
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--heritage-orange))",
                  transform: "rotate(-2deg)",
                  display: "inline-block"
                },
                children: "Some ideas to inspire your journey"
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "font-body text-sm tracking-widest uppercase mb-6",
                style: { color: "hsl(var(--heritage-orange))" },
                children: "Threads to follow"
              }
            ),
            /* @__PURE__ */ jsxs(
              "h1",
              {
                className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 relative inline-block",
                style: { color: "hsl(0 0% 98%)" },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Amsterdam experience inspiration. " }),
                  "What draws you in?",
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": true,
                      className: "absolute -bottom-2 right-0",
                      width: "160",
                      height: "14",
                      viewBox: "0 0 160 14",
                      fill: "none",
                      style: { color: "hsl(var(--heritage-orange))" },
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M2 8 C 22 2, 42 12, 62 6 S 102 2, 122 8 S 152 4, 158 7",
                          stroke: "currentColor",
                          strokeWidth: "2.4",
                          strokeLinecap: "round",
                          fill: "none"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "font-body text-lg leading-relaxed",
                style: { color: "hsl(0 0% 94%)" },
                children: "No two journeys are ever the same. These are a few places where they often begin."
              }
            )
          ] }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-16 md:py-20 lg:py-24 overflow-hidden",
        style: { backgroundColor: "hsl(40 38% 96%)" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-multiply",
              "aria-hidden": true,
              style: {
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-6 lg:px-12", children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-8", children: themes.filter((t) => t && t.title && t.image).map((theme, i) => {
              const isActive = active === theme.id;
              const paperPalette = [
                "hsl(40 38% 97%)",
                // cream
                "hsl(120 22% 92%)",
                // soft green
                "hsl(22 70% 92%)",
                // warm orange-blush
                "hsl(350 35% 92%)"
                // dusty bordeaux-pink
              ];
              const paperBg = paperPalette[i % paperPalette.length];
              const isLeft = theme.pin === "tape-tl" || theme.pin === "tape-gl";
              const tapeColors = [
                { bg: "hsl(var(--heritage-orange) / 0.72)", border: "hsl(var(--heritage-bordeaux) / 0.30)" },
                { bg: "hsl(var(--heritage-green) / 0.55)", border: "hsl(var(--heritage-green) / 0.40)" },
                { bg: "hsl(var(--heritage-bordeaux) / 0.45)", border: "hsl(var(--heritage-bordeaux) / 0.35)" }
              ];
              const tape = tapeColors[i % 3];
              const outlineColors = [
                "hsl(var(--heritage-orange))",
                "hsl(var(--heritage-green))",
                "hsl(var(--heritage-purple))"
              ];
              const outlineColor = outlineColors[i % 3];
              const sketchVariants = [
                [
                  "M 3 4 C 22 2.5, 48 4, 70 2.8 S 96 3.4, 97.5 5 C 98.6 26, 96.8 50, 98 74 C 98.4 92, 97.5 97, 95.5 97.6 C 74 98.8, 50 97.2, 26 98.6 C 9 99, 3 98, 2.5 95.5 C 1.4 75, 3.2 50, 1.8 26 C 1.4 8, 2.2 3, 4 3.4 Z",
                  "M 4 3 C 24 4, 50 2.6, 72 4.2 S 97 4.6, 96.6 6.2 C 97.8 27, 98.6 51, 96.8 75 C 96.4 93, 97.8 96.4, 95 97.4 C 73 97, 49 98.6, 25 96.8 C 8 96.4, 4 97, 3.6 94 C 2.6 74, 1.6 49, 3 25 C 3.4 7, 3 4, 4.4 3.2 Z"
                ],
                [
                  "M 2.5 5 C 26 3.6, 52 5.2, 74 3.4 S 97 4.2, 97 6.4 C 96 28, 98.4 52, 97.2 76 C 97 91, 96 97.8, 94 97 C 72 98, 48 96.6, 24 98 C 7 98.6, 3 97.4, 3.4 94.4 C 2 74, 4 48, 2.4 24 C 2 6, 2.6 4, 4.6 4 Z",
                  "M 5 4 C 28 5.4, 54 3, 75 5.4 S 96 5.6, 95.8 7.4 C 96.6 28, 97 53, 96 77 C 95.6 92, 96.4 95.8, 93.6 96.8 C 71 96.4, 47 98, 23 96.4 C 7 96, 4.4 96.6, 4.4 93.4 C 3.4 73, 2 48, 3.6 24 C 4 6.6, 4 4.4, 5.2 4 Z"
                ],
                [
                  "M 3.4 3 C 23 4.4, 49 2.4, 71 4 S 96.4 2.8, 98 4.4 C 99 27, 97.4 51, 98.6 75 C 99 93, 96.6 97.4, 94.4 98 C 73 98.4, 49 96.6, 25 98 C 8 98.4, 2 98, 2.8 95 C 1 75, 3.6 49, 2 25 C 1.6 8, 2.4 2.6, 4.4 3 Z",
                  "M 4.6 4.4 C 25 3, 51 4.6, 73 3 S 96 6, 96.4 7.2 C 97.4 28, 98.8 52, 97 76 C 96.6 92, 97.4 96, 94.6 97 C 73 97.6, 49 98, 25 96.4 C 9 96, 4 97.6, 3.6 94.6 C 2.4 74, 1.4 49, 3 25 C 3.4 7, 3 4.4, 4.4 4 Z"
                ],
                [
                  "M 3 3.4 C 24 2, 47 4.4, 69 3 S 95 4, 97.6 5.4 C 98 26, 97.6 50, 98.4 75 C 98.6 93, 96.6 96, 95 97 C 75 99, 51 97.6, 27 99 C 9 98.6, 2.6 97.4, 2.6 95 C 1.6 76, 2.6 51, 1.4 26 C 1.6 7, 2 3.4, 4 3 Z",
                  "M 4.4 4 C 26 5, 52 3.4, 74 4.6 S 96.4 4, 96 6 C 97 27, 98.4 50, 96.4 76 C 96.6 92, 97.6 95.6, 94.6 96.8 C 72 97.4, 48 99, 24 97 C 7 96.6, 4 97, 3.4 94 C 2.4 74, 1.6 48, 3.4 24 C 3.6 7, 2.6 4.4, 4.4 3.4 Z"
                ]
              ];
              const sketchPaths = sketchVariants[i % sketchVariants.length];
              return /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.08, children: /* @__PURE__ */ jsx("div", { ref: (el) => {
                cardRefs.current[theme.id] = el;
              }, children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActive(isActive ? null : theme.id),
                  className: "group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4",
                  style: { transform: `rotate(${isActive ? 0 : theme.rotate}deg)` },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        "aria-hidden": true,
                        className: "pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl",
                        style: {
                          background: "radial-gradient(closest-side, hsl(var(--heritage-orange) / 0.35), transparent 70%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "p-2.5 sm:p-3 pb-16 sm:pb-20 transition-all duration-500 relative",
                        children: [
                          /* @__PURE__ */ jsxs(
                            "svg",
                            {
                              "aria-hidden": true,
                              className: "absolute inset-0 w-full h-full pointer-events-none transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_22px_24px_rgba(0,0,0,0.28))]",
                              viewBox: "0 0 100 100",
                              preserveAspectRatio: "none",
                              style: {
                                color: outlineColor,
                                overflow: "visible",
                                filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
                              },
                              children: [
                                /* @__PURE__ */ jsx("path", { d: sketchPaths[0], fill: paperBg, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", style: { strokeWidth: "2.4px" } }),
                                /* @__PURE__ */ jsx("path", { d: sketchPaths[1], fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", style: { strokeWidth: "1.2px", opacity: 0.55 } })
                              ]
                            }
                          ),
                          i % 2 === 0 ? /* @__PURE__ */ jsx(
                            "span",
                            {
                              "aria-hidden": true,
                              className: cn(
                                "absolute top-1 sm:top-1.5 w-16 sm:w-20 h-5 sm:h-6 border z-10 shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                                isLeft ? "left-3 sm:left-5 -rotate-[8deg]" : "right-3 sm:right-5 rotate-[6deg]"
                              ),
                              style: {
                                backgroundColor: tape.bg,
                                borderColor: tape.border
                              }
                            }
                          ) : /* @__PURE__ */ jsx(
                            "span",
                            {
                              "aria-hidden": true,
                              className: "absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full z-10 shadow-[inset_-1.5px_-2px_2.5px_rgba(0,0,0,0.4),inset_2px_2px_2.5px_rgba(255,255,255,0.55),0_3px_4px_rgba(0,0,0,0.4)]",
                              style: { backgroundColor: outlineColor }
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted", children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: theme.image,
                              alt: theme.title,
                              width: 768,
                              height: 960,
                              loading: "lazy",
                              decoding: "async",
                              fetchpriority: "low",
                              className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150",
                              style: { filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }
                            }
                          ) }),
                          /* @__PURE__ */ jsxs("div", { className: "relative mt-3 sm:mt-4 px-1.5 sm:px-2", children: [
                            /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide", children: theme.title }),
                            /* @__PURE__ */ jsxs(
                              "p",
                              {
                                className: "text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug",
                                style: {
                                  fontFamily: "'Caveat', cursive",
                                  color: "hsl(var(--heritage-bordeaux))"
                                },
                                children: [
                                  /* @__PURE__ */ jsx(
                                    "span",
                                    {
                                      "aria-hidden": true,
                                      className: "inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle",
                                      style: { backgroundColor: "hsl(var(--heritage-orange))" }
                                    }
                                  ),
                                  theme.note
                                ]
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "overflow-hidden transition-all duration-500 ease-out",
                          isActive ? "max-h-60 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0 mt-0"
                        ),
                        children: /* @__PURE__ */ jsx(
                          "p",
                          {
                            className: "text-lg sm:text-xl md:text-2xl leading-snug px-1",
                            style: {
                              fontFamily: "'Caveat', cursive",
                              color: "hsl(var(--heritage-bordeaux))"
                            },
                            children: theme.caption
                          }
                        )
                      }
                    )
                  ]
                }
              ) }) }, theme.id);
            }) }),
            /* @__PURE__ */ jsxs(FadeIn, { children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-center mt-16 mb-2 text-2xl md:text-3xl",
                  style: {
                    fontFamily: "'Caveat', cursive",
                    color: "hsl(var(--heritage-orange))",
                    transform: "rotate(-1.5deg)"
                  },
                  children: "when you're ready…"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "font-body text-center text-base mb-4 text-foreground/70", children: "Pick a few that speak to you, then let's talk about building your perfect day." }),
              /* @__PURE__ */ jsx("p", { className: "text-center", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#contact",
                  className: "font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80 inline-flex items-center gap-2",
                  style: {
                    color: "hsl(var(--heritage-bordeaux))",
                    borderColor: "hsl(var(--heritage-bordeaux) / 0.5)"
                  },
                  children: [
                    "Ready to start planning? Let's talk.",
                    /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
                  ]
                }
              ) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
};
(_F = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _F.call(globalThis, "src/components/ui/select.tsx");
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const iconItinerary = "/assets/icon-itinerary-ByoXuXMd.png";
const iconHistory = "/assets/icon-history-DD9Injv1.png";
(_G = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _G.call(globalThis, "src/pages/TravelAgents.tsx");
const Squiggle = ({ color = "hsl(var(--heritage-orange))", className = "w-40 h-4" }) => /* @__PURE__ */ jsx("svg", { "aria-hidden": true, viewBox: "0 0 200 14", className, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M 6 8 C 50 2, 150 12, 194 6",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    fill: "none"
  }
) });
const PaperGrain = () => /* @__PURE__ */ jsx(
  "div",
  {
    "aria-hidden": true,
    className: "pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply",
    style: {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
    }
  }
);
const SectionDivider = () => /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsx(Squiggle, { className: "w-32 h-3 opacity-60" }) }) });
const FaintCanal = ({ side = "right" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    "aria-hidden": true,
    viewBox: "0 0 600 200",
    className: `pointer-events-none absolute bottom-0 ${side === "right" ? "right-0" : "left-0"} w-[520px] max-w-[60%] opacity-[0.06]`,
    fill: "none",
    stroke: "hsl(var(--heritage-orange))",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M0 180 L600 180" }),
      /* @__PURE__ */ jsx("path", { d: "M40 180 L40 120 L60 100 L80 120 L80 180" }),
      /* @__PURE__ */ jsx("path", { d: "M50 130 L50 150 M70 130 L70 150" }),
      /* @__PURE__ */ jsx("path", { d: "M120 180 L120 90 L150 70 L180 90 L180 180" }),
      /* @__PURE__ */ jsx("path", { d: "M135 110 L135 140 M165 110 L165 140" }),
      /* @__PURE__ */ jsx("path", { d: "M220 180 L220 110 L240 95 L260 110 L260 180" }),
      /* @__PURE__ */ jsx("path", { d: "M310 180 L310 80 L340 60 L370 80 L370 180" }),
      /* @__PURE__ */ jsx("path", { d: "M325 100 L325 130 M355 100 L355 130" }),
      /* @__PURE__ */ jsx("path", { d: "M410 180 L410 100 L440 80 L470 100 L470 180" }),
      /* @__PURE__ */ jsx("path", { d: "M510 180 L510 120 L530 100 L550 120 L550 180" })
    ]
  }
);
const TravelAgents = () => {
  const { toast: toast2 } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", inquiryType: "", message: "" });
  const scrollToContact = (e) => {
    var _a2;
    e.preventDefault();
    (_a2 = document.getElementById("contact")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast2({ title: "Inquiry sent", description: "Thank you. I'll be in touch personally." });
    setForm({ name: "", company: "", email: "", inquiryType: "", message: "" });
  };
  const ctaClass = "inline-block font-body text-sm tracking-widest uppercase px-8 py-4 border-2 transition-colors duration-300";
  const ctaPrimary = `${ctaClass} text-primary-foreground`;
  const ctaPrimaryStyle = {
    backgroundColor: "hsl(var(--heritage-bordeaux))",
    borderColor: "hsl(var(--heritage-bordeaux))"
  };
  return /* @__PURE__ */ jsxs("main", { className: "bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Amsterdam Local Partner for Travel Advisors" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Dennis Gerrits supports travel advisors and concierges in Amsterdam: on-the-ground care for your clients, tailored days, bookings and local answers."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://dennisgerrits.com/travel-agents" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Amsterdam Local Partner for Travel Advisors" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "On-the-ground care in Amsterdam for the clients of travel advisors and concierges."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://dennisgerrits.com/travel-agents" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Dennis Gerrits – Amsterdam Travel Companion",
        url: "https://dennisgerrits.com/travel-agents",
        description: "Collaboration for travel advisors and concierges: a trusted local companion in Amsterdam who looks after your clients, arranges tailored days and answers questions on the ground.",
        areaServed: { "@type": "City", name: "Amsterdam" },
        provider: {
          "@type": "Person",
          name: "Dennis Gerrits",
          jobTitle: "Travel Companion & Storyteller"
        }
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-20 lg:py-28 overflow-hidden", children: [
      /* @__PURE__ */ jsx(FaintCanal, { side: "right" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12 relative", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxs(FadeIn, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary mb-6", children: "For Travel Advisors & Concierges" }),
          /* @__PURE__ */ jsxs("h1", { className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8", children: [
            "I take care of your clients",
            /* @__PURE__ */ jsx("br", {}),
            "in Amsterdam."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-body text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 space-y-5", children: [
            /* @__PURE__ */ jsx("p", { children: "Travel plans can change. Questions come up. Sometimes clients simply feel more comfortable knowing they have someone local they can reach out to." }),
            /* @__PURE__ */ jsx("p", { children: "I'm there as a trusted presence on the ground, before, during, and whenever needed throughout their stay." }),
            /* @__PURE__ */ jsx("p", { children: "I personally share my phone number with every client, so they can easily contact me throughout their stay, including in the evenings when needed." }),
            /* @__PURE__ */ jsx("p", { children: "Whether it's practical support like finding a pharmacy, help with local coordination, last-minute adjustments, or simply a familiar contact in the city, your clients know they are not navigating Amsterdam alone." })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#contact", onClick: scrollToContact, className: ctaPrimary, style: ctaPrimaryStyle, children: "Let's Connect" })
        ] }),
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-md", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": true,
              className: "absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[-4deg] z-10",
              style: { backgroundColor: "hsl(var(--heritage-orange) / 0.55)" }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "bg-background p-3 pb-12 shadow-lg",
              style: { transform: "rotate(-1.5deg)" },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: lovableAssetUrl(dennisBoat.url),
                    alt: "Dennis in Amsterdam",
                    className: "w-full aspect-[4/5] object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-center mt-4 text-2xl",
                    style: { fontFamily: "'Caveat', cursive", color: "hsl(var(--heritage-bordeaux))" },
                    children: "based in Amsterdam"
                  }
                )
              ]
            }
          )
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95]", children: "Two ways to work together" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-lg text-muted-foreground mt-6", children: "Every travel advisor works differently. I adapt to the way you prefer to work." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.1, children: /* @__PURE__ */ jsxs(
          "article",
          {
            className: "h-full p-10 lg:p-12 bg-background border-t-4 shadow-md hover:shadow-xl transition-shadow rounded-sm",
            style: { borderColor: "hsl(var(--heritage-purple))" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-body text-xs tracking-widest uppercase text-secondary mb-2", children: "Option One" }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "font-heading text-7xl leading-none",
                      style: { color: "hsl(var(--heritage-orange))" },
                      children: "01"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("img", { src: iconItinerary, alt: "", "aria-hidden": true, className: "w-14 h-14 object-contain", loading: "lazy" })
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block font-body text-xs tracking-widest uppercase px-3 py-1 mb-4 rounded-sm",
                  style: { backgroundColor: "hsl(var(--heritage-purple) / 0.12)", color: "hsl(var(--heritage-purple))" },
                  children: "Full concierge – I plan and deliver"
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight", children: "You hand it over. I take care of the rest." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5 font-body text-foreground/90 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { children: "Your clients are personally taken care of before they even arrive in Amsterdam." }),
                /* @__PURE__ */ jsx("p", { children: "I begin with a video call to get to know them, their interests, travel style, pace, and what they hope to experience during their time in the Netherlands. Based on that, I create a fully personalized itinerary that feels thoughtful, seamless, and deeply local." }),
                /* @__PURE__ */ jsx("p", { children: "I take care of reservations, tickets and timed entries, private boats, transportation, restaurant recommendations, and personal guidance throughout their stay. Always with flexibility, attention to detail, and genuine care." }),
                /* @__PURE__ */ jsx("p", { children: "You stay informed, while your clients feel relaxed, welcomed, and completely looked after." })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.2, children: /* @__PURE__ */ jsxs(
          "article",
          {
            className: "h-full p-10 lg:p-12 bg-background border-t-4 shadow-md hover:shadow-xl transition-shadow rounded-sm",
            style: { borderColor: "hsl(var(--heritage-green))" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-body text-xs tracking-widest uppercase text-secondary mb-2", children: "Option Two" }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "font-heading text-7xl leading-none",
                      style: { color: "hsl(var(--heritage-orange))" },
                      children: "02"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("img", { src: iconFoot, alt: "", "aria-hidden": true, className: "w-14 h-14 object-contain", loading: "lazy" })
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block font-body text-xs tracking-widest uppercase px-3 py-1 mb-4 rounded-sm",
                  style: { backgroundColor: "hsl(var(--heritage-green) / 0.14)", color: "hsl(var(--heritage-green))" },
                  children: "Local partner – you plan, I host"
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight", children: "You plan. I deliver on the ground." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5 font-body text-foreground/90 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { children: "You already have the trip, itinerary, or structure in place. I step in as your trusted local contact on the ground in Amsterdam and throughout the Netherlands." }),
                /* @__PURE__ */ jsx("p", { children: "I welcome your clients personally, help bring the itinerary to life, assist with local coordination when needed, and make sure everything runs smoothly during their stay." }),
                /* @__PURE__ */ jsx("p", { children: "Your clients experience the warmth, flexibility, and local connection of having someone nearby while you remain their trusted advisor throughout the journey." })
              ] })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-16 lg:py-20 overflow-hidden",
        style: {
          background: "linear-gradient(180deg, hsl(var(--heritage-bordeaux) / 0.08) 0%, hsl(var(--background)) 100%)"
        },
        children: [
          /* @__PURE__ */ jsx(FaintCanal, { side: "left" }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-12 lg:mb-16", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: iconMessage,
                  alt: "",
                  "aria-hidden": true,
                  className: "w-14 h-14 mb-6",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[1]", children: "Your clients have a local they can rely on." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 lg:mb-16", children: [
              {
                title: "A trusted presence",
                body: "Travel plans can change. Questions come up. I'm there before, during, and whenever needed throughout their stay."
              },
              {
                title: "Reachable, personally",
                body: "Every client gets my phone number, so they can contact me throughout their stay, including in the evenings when needed."
              },
              {
                title: "Practical support",
                body: "From finding a pharmacy to last-minute adjustments, your clients know they are not navigating Amsterdam alone."
              }
            ].map((item, i) => /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.08, children: /* @__PURE__ */ jsxs("div", { className: "border-t pt-5", style: { borderColor: "hsl(var(--heritage-bordeaux) / 0.4)" }, children: [
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-primary mb-2 leading-tight", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-base text-foreground/85 leading-relaxed", children: item.body })
            ] }) }, item.title)) }),
            /* @__PURE__ */ jsx(FadeIn, { delay: 0.2, children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative p-8 lg:p-10 border-l-4 bg-background shadow-md",
                style: {
                  borderColor: "hsl(var(--heritage-orange))",
                  transform: "rotate(-0.4deg)"
                },
                children: [
                  /* @__PURE__ */ jsx(PaperGrain, {}),
                  /* @__PURE__ */ jsxs("div", { className: "relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
                      /* @__PURE__ */ jsx("img", { src: iconHistory, alt: "", "aria-hidden": true, className: "w-12 h-12 object-contain mb-4", loading: "lazy" }),
                      /* @__PURE__ */ jsx("h3", { className: "font-heading text-2xl lg:text-3xl text-primary leading-tight", children: "A true extension of your service." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 space-y-4 font-body text-base lg:text-lg text-foreground/90 leading-relaxed", children: [
                      /* @__PURE__ */ jsx("p", { children: "When we work together, you're not handing your clients off. You're extending your service with someone you can trust. Someone who understands your clients, takes ownership, and is there when it matters." }),
                      /* @__PURE__ */ jsx("p", { className: "font-heading text-xl lg:text-2xl text-primary pt-1", children: `So you can say: "I have someone in Amsterdam. He'll take care of you." And truly mean it.` })
                    ] })
                  ] })
                ]
              }
            ) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-20 lg:py-28 overflow-hidden",
        style: { backgroundColor: "hsl(var(--heritage-taupe) / 0.18)" },
        children: [
          /* @__PURE__ */ jsx(PaperGrain, {}),
          /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-12 relative", children: [
            /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary", children: "From Advisors I Work With" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto", children: [
              {
                quote: "Dennis is our trusted contact in Amsterdam. Our clients are always in the best hands.",
                author: "Travel Advisor",
                location: "United States"
              },
              {
                quote: "Working with Dennis gives us complete peace of mind. Our clients are taken care of from start to finish.",
                author: "Travel Advisor",
                location: "United States"
              }
            ].map((t, i) => /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.1, children: /* @__PURE__ */ jsxs("figure", { className: "text-center px-4", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: "block font-heading text-7xl leading-none select-none mb-4",
                  style: { color: "hsl(var(--heritage-green))" },
                  children: "“"
                }
              ),
              /* @__PURE__ */ jsx("blockquote", { className: "font-body text-xl lg:text-2xl text-primary leading-relaxed mb-8", children: t.quote }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "block h-[2px] w-10",
                  style: { backgroundColor: "hsl(var(--heritage-orange))" }
                }
              ) }),
              /* @__PURE__ */ jsxs("figcaption", { className: "font-body text-sm tracking-wide uppercase text-secondary", children: [
                t.author,
                ", ",
                t.location
              ] })
            ] }) }, i)) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SectionDivider, {}),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 lg:py-28 scroll-mt-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto relative", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          "aria-hidden": true,
          viewBox: "0 0 14 400",
          className: "hidden lg:block absolute left-1/2 top-4 -translate-x-1/2 h-[80%] w-3 opacity-50",
          fill: "none",
          stroke: "hsl(var(--heritage-orange))",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: /* @__PURE__ */ jsx("path", { d: "M 6 4 C 12 80, 2 160, 8 240 C 12 320, 4 380, 6 396" })
        }
      ),
      /* @__PURE__ */ jsx(FadeIn, { children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm tracking-widest uppercase text-secondary mb-6", children: "Let's Connect" }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] mb-8", children: "If this resonates, I'd love to hear from you." }),
        /* @__PURE__ */ jsxs("div", { className: "font-body text-lg text-muted-foreground leading-relaxed space-y-5", children: [
          /* @__PURE__ */ jsx("p", { children: "The easiest way to start is simply by sending me a message." }),
          /* @__PURE__ */ jsx("p", { children: "From there, we can schedule a short introductory call so I can introduce myself and learn more about how you like to work and what your clients are looking for." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-background rounded-sm p-10 shadow-md border-t-4",
          style: { borderColor: "hsl(var(--heritage-orange))" },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-2xl text-primary mb-6", children: "Get in touch" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Your Name" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    required: true,
                    value: form.name,
                    onChange: (e) => setForm({ ...form, name: e.target.value }),
                    className: "h-12 text-base font-body"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Agency / Company" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: form.company,
                    onChange: (e) => setForm({ ...form, company: e.target.value }),
                    className: "h-12 text-base font-body"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "font-body text-sm", children: "Email Address" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    required: true,
                    type: "email",
                    value: form.email,
                    onChange: (e) => setForm({ ...form, email: e.target.value }),
                    className: "h-12 text-base font-body"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(Label, { className: "font-body text-sm", children: [
                  "How can I help? ",
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/70", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: form.inquiryType,
                    onValueChange: (v) => setForm({ ...form, inquiryType: v }),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { className: "h-12 text-base font-body", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose what fits best" }) }),
                      /* @__PURE__ */ jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsx(SelectItem, { value: "full-concierge", children: "Full concierge – I plan and deliver" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "local-partner", children: "Local partner – you plan, I host" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "exploring", children: "Just exploring a fit" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "other", children: "Something else" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(Label, { className: "font-body text-sm", children: [
                  "Tell me about your clients ",
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/70", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    value: form.message,
                    onChange: (e) => setForm({ ...form, message: e.target.value }),
                    placeholder: "A few words about who's coming, when, and what they're hoping for.",
                    className: "min-h-[120px] text-base font-body"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("button", { type: "submit", className: `${ctaPrimary} w-full`, style: ctaPrimaryStyle, children: "Reach out" })
            ] })
          ]
        }
      ) })
    ] }) }) })
  ] });
};
(_H = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _H.call(globalThis, "src/pages/NotebookIndex.tsx");
const NotebookIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const loaderData = useLoaderData();
  const initialStories = loaderData == null ? void 0 : loaderData.stories;
  const { data: stories = [], isLoading } = useQuery({
    initialData: initialStories,
    queryKey: ["notebook-stories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stories").select("id, slug, title, intro, body, sort_order").order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dennis Gerrits – Notebook",
    description: "Short reflections from Amsterdam by Dennis Gerrits. Stories about the city, its people and everyday traditions.",
    url: "https://dennisgerrits.com/notebook",
    blogPost: stories.map((s) => ({
      "@type": "BlogPosting",
      headline: s.title,
      description: s.intro,
      url: `https://dennisgerrits.com/notebook/${s.slug}`
    }))
  };
  return /* @__PURE__ */ jsxs("main", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Notebook – Dennis Gerrits | Stories from Amsterdam" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Short reflections from Amsterdam by Dennis Gerrits. Asparagus season, bike exams, Nijntje, Van Gogh in bricks, and more."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://dennisgerrits.com/notebook" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Notebook – Dennis Gerrits" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Short reflections from Amsterdam by Dennis Gerrits."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://dennisgerrits.com/notebook" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "relative pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 overflow-hidden",
        style: { backgroundColor: "hsl(40 38% 96%)" },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxs(FadeIn, { children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-body text-sm tracking-widest uppercase mb-6",
              style: { color: "hsl(var(--heritage-bordeaux))" },
              children: "Notes From the City"
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-6", children: "From my notebook" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-lg text-muted-foreground leading-relaxed", children: "Short reflections about Amsterdam. The kind of things I'd tell you over a coffee." })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: isLoading ? /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "Loading…" }) : /* @__PURE__ */ jsx("ol", { className: "max-w-3xl mx-auto space-y-14 md:space-y-16 list-none", children: stories.map((story, i) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx(FadeIn, { delay: i * 0.04, children: /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "font-body text-xs tracking-[0.3em] uppercase mb-2",
            style: { color: "hsl(var(--heritage-orange))" },
            children: [
              "Chapter ",
              story.sort_order
            ]
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[1] mb-4", children: story.title }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-xl leading-relaxed mb-5 text-foreground/90", children: story.intro }),
        story.body && /* @__PURE__ */ jsx("div", { className: "font-body text-lg leading-relaxed text-foreground/80 space-y-5", children: story.body.split(/\n\n+/).map((para, i2) => /* @__PURE__ */ jsx("p", { children: para }, i2)) })
      ] }) }),
      i < stories.length - 1 && /* @__PURE__ */ jsx("div", { className: "mt-14 md:mt-16 flex justify-center", children: /* @__PURE__ */ jsx(
        "svg",
        {
          "aria-hidden": true,
          width: "120",
          height: "10",
          viewBox: "0 0 120 10",
          fill: "none",
          style: { color: "hsl(var(--heritage-taupe))" },
          children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M 2 5 C 20 2, 40 8, 60 5 S 100 2, 118 6",
              stroke: "currentColor",
              strokeWidth: "1.2",
              strokeLinecap: "round",
              fill: "none"
            }
          )
        }
      ) })
    ] }, story.id)) }) }) })
  ] });
};
(_I = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _I.call(globalThis, "src/pages/NotebookStory.tsx");
const NotebookStory = () => {
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const loaderData = useLoaderData();
  const { data: story, isLoading } = useQuery({
    initialData: loaderData == null ? void 0 : loaderData.story,
    queryKey: ["notebook-story", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase.from("stories").select("id, slug, title, intro, body, sort_order").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    }
  });
  const { data: all = [] } = useQuery({
    initialData: loaderData == null ? void 0 : loaderData.stories,
    queryKey: ["notebook-stories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stories").select("slug, title, sort_order").order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
  const idx = all.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  if (isLoading) {
    return /* @__PURE__ */ jsx("main", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "Loading…" }) });
  }
  if (!story) {
    return /* @__PURE__ */ jsxs("main", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "This chapter doesn't exist." }),
      /* @__PURE__ */ jsx(Link, { to: "/notebook", className: "font-body text-sm underline text-secondary", children: "← Back to the notebook" })
    ] });
  }
  const url2 = `https://dennisgerrits.com/notebook/${story.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.intro,
    author: { "@type": "Person", name: "Dennis Gerrits" },
    url: url2,
    mainEntityOfPage: url2
  };
  return /* @__PURE__ */ jsxs("main", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        story.title,
        " – Notebook | Dennis Gerrits"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: story.intro.slice(0, 155) }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: url2 }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${story.title} – Notebook` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: story.intro.slice(0, 155) }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: url2 }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-3xl", children: [
      /* @__PURE__ */ jsxs(FadeIn, { children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/notebook",
            className: "inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-secondary transition-colors mb-8",
            children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "←" }),
              " Back to the notebook"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "font-body text-xs tracking-[0.3em] uppercase mb-3",
            style: { color: "hsl(var(--heritage-orange))" },
            children: [
              "Chapter ",
              story.sort_order
            ]
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8", children: story.title }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-xl leading-relaxed mb-6 text-foreground/90", children: story.intro }),
        story.body && /* @__PURE__ */ jsx("div", { className: "font-body text-lg leading-relaxed text-foreground/80 space-y-5", children: story.body.split(/\n\n+/).map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row gap-6 sm:gap-4 justify-between", children: [
        prev ? /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/notebook/${prev.slug}`,
            className: "group font-body text-sm text-muted-foreground hover:text-secondary transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs uppercase tracking-widest mb-1", children: "← Previous" }),
              /* @__PURE__ */ jsx("span", { className: "font-heading text-xl text-primary group-hover:text-secondary transition-colors", children: prev.title })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", {}),
        next ? /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/notebook/${next.slug}`,
            className: "group font-body text-sm text-muted-foreground hover:text-secondary transition-colors text-right",
            children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs uppercase tracking-widest mb-1", children: "Next →" }),
              /* @__PURE__ */ jsx("span", { className: "font-heading text-xl text-primary group-hover:text-secondary transition-colors", children: next.title })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", {})
      ] })
    ] })
  ] });
};
(_J = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _J.call(globalThis, "src/components/ui/button.tsx");
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size: size2, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size: size2, className })), ref, ...props });
  }
);
Button.displayName = "Button";
(_K = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _K.call(globalThis, "src/pages/Admin.tsx");
const SUPABASE_URL = "https://tfxqzsgxkkccvpgennmc.supabase.co";
function publicUrl(path) {
  if (!path) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/story-images/${path}`;
}
const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const fileInputs = useRef({});
  const [pwOpen, setPwOpen] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: rows, error } = await supabase.from("stories").select("*").order("sort_order", { ascending: true });
      if (!mounted) return;
      if (error) toast$1.error(error.message);
      else setStories(rows);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const update = (id, patch) => setStories((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s));
  const save = async (story) => {
    setSavingId(story.id);
    const { error } = await supabase.from("stories").update({
      title: story.title,
      intro: story.intro,
      body: story.body,
      image_path: story.image_path,
      sort_order: story.sort_order
    }).eq("id", story.id);
    setSavingId(null);
    if (error) toast$1.error(error.message);
    else toast$1.success("Saved");
  };
  const move = async (id, dir) => {
    const idx = stories.findIndex((s) => s.id === id);
    const swapWith = idx + dir;
    if (swapWith < 0 || swapWith >= stories.length) return;
    const a = stories[idx];
    const b = stories[swapWith];
    const next = [...stories];
    next[idx] = { ...b, sort_order: a.sort_order };
    next[swapWith] = { ...a, sort_order: b.sort_order };
    setStories(next.sort((x, y) => x.sort_order - y.sort_order));
    await Promise.all([
      supabase.from("stories").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("stories").update({ sort_order: a.sort_order }).eq("id", b.id)
    ]);
  };
  const uploadImage = async (story, file) => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${story.slug}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("story-images").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) {
      toast$1.error(error.message);
      return;
    }
    const { error: updErr } = await supabase.from("stories").update({ image_path: path }).eq("id", story.id);
    if (updErr) {
      toast$1.error(updErr.message);
      return;
    }
    update(story.id, { image_path: path });
    toast$1.success("Image updated");
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };
  const changePassword = async () => {
    if (newPw.length < 8) {
      toast$1.error("Password must be at least 8 characters");
      return;
    }
    if (newPw !== confirmPw) {
      toast$1.error("Passwords do not match");
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (error) {
      toast$1.error(error.message);
      return;
    }
    toast$1.success("Password updated");
    setNewPw("");
    setConfirmPw("");
    setPwOpen(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("main", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-muted/30 py-12 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl text-primary", children: "Stories" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Edit text, swap images, reorder. Changes appear live on Get Inspired." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/admin/settings", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
          " Site content"
        ] }) }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setPwOpen((v) => !v), children: [
          /* @__PURE__ */ jsx(KeyRound, { className: "w-4 h-4 mr-2" }),
          " Change password"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: signOut, children: [
          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
          " Sign out"
        ] })
      ] })
    ] }),
    pwOpen && /* @__PURE__ */ jsxs("div", { className: "bg-card border rounded-lg p-6 shadow-sm space-y-4 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl text-primary", children: "Change password" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Choose a new password for your admin account. Minimum 8 characters." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-pw", children: "New password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-pw",
            type: "password",
            value: newPw,
            onChange: (e) => setNewPw(e.target.value),
            autoComplete: "new-password"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-pw", children: "Confirm new password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "confirm-pw",
            type: "password",
            value: confirmPw,
            onChange: (e) => setConfirmPw(e.target.value),
            autoComplete: "new-password"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            onClick: () => {
              setPwOpen(false);
              setNewPw("");
              setConfirmPw("");
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(Button, { onClick: changePassword, disabled: pwSaving, children: pwSaving ? "Saving..." : "Update password" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: stories.map((story, i) => /* @__PURE__ */ jsx(
      "article",
      {
        className: "bg-card border rounded-lg p-6 shadow-sm space-y-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => move(story.id, -1),
                disabled: i === 0,
                "aria-label": "Move up",
                children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => move(story.id, 1),
                disabled: i === stories.length - 1,
                "aria-label": "Move down",
                children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: `title-${story.id}`, children: "Title" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: `title-${story.id}`,
                  value: story.title,
                  onChange: (e) => update(story.id, { title: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: `intro-${story.id}`, children: "Intro" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: `intro-${story.id}`,
                  rows: 2,
                  value: story.intro,
                  onChange: (e) => update(story.id, { intro: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: `body-${story.id}`, children: "Body" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: `body-${story.id}`,
                  rows: 6,
                  value: story.body,
                  onChange: (e) => update(story.id, { body: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              story.image_path ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: publicUrl(story.image_path),
                  alt: "",
                  className: "w-24 h-24 object-cover rounded-md border"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-md border border-dashed flex items-center justify-center text-xs text-muted-foreground", children: "No image" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: (el) => fileInputs.current[story.id] = el,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => {
                    var _a2;
                    const f = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                    if (f) uploadImage(story, f);
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    var _a2;
                    return (_a2 = fileInputs.current[story.id]) == null ? void 0 : _a2.click();
                  },
                  children: [
                    /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4 mr-2" }),
                    " Replace image"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                onClick: () => save(story),
                disabled: savingId === story.id,
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
                  savingId === story.id ? "Saving..." : "Save changes"
                ]
              }
            ) })
          ] })
        ] })
      },
      story.id
    )) })
  ] }) });
};
(_L = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _L.call(globalThis, "src/pages/AdminLogin.tsx");
const USERNAME_TO_EMAIL = {
  admin: "admin@dennis.local"
};
const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);
  const signIn = async (email, pwd) => supabase.auth.signInWithPassword({ email, password: pwd });
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = USERNAME_TO_EMAIL[username.trim().toLowerCase()];
    if (!email) {
      setLoading(false);
      toast$1.error("Unknown username");
      return;
    }
    let { error } = await signIn(email, password);
    if (error && username.trim().toLowerCase() === "admin") {
      const { error: fnErr } = await supabase.functions.invoke("bootstrap-admin");
      if (!fnErr) {
        ({ error } = await signIn(email, password));
      }
    }
    setLoading(false);
    if (error) {
      toast$1.error("Invalid username or password");
      return;
    }
    navigate("/admin", { replace: true });
  };
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen flex items-center justify-center px-6 py-24 bg-background", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit,
      className: "w-full max-w-sm bg-card border rounded-lg p-8 shadow-sm space-y-5",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl text-primary mb-1", children: "Admin login" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Sign in to manage stories." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "username",
              type: "text",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              required: true,
              autoComplete: "username"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              autoComplete: "current-password"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Signing in..." : "Sign in" })
      ]
    }
  ) });
};
(_M = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _M.call(globalThis, "src/components/ui/badge.tsx");
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
(_N = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _N.call(globalThis, "src/lib/siteContentSchema.ts");
const CONTENT_SCHEMA = [
  {
    id: "about",
    title: "About",
    description: "The split section: 'The Person' and 'The Guide'.",
    fields: [
      { key: "about.person.title", label: "Person – title", type: "short", fallback: "The Person" },
      { key: "about.person.kicker", label: "Person – kicker", type: "short", fallback: "A True Amsterdammer" },
      {
        key: "about.person.body",
        label: "Person – paragraph",
        type: "rich",
        fallback: "I have always been drawn to stories, people and places that move you in some way.\n\nAmsterdam became that place for me. I’ve called this city home for more than twenty years now, and over time it became an integral part of who I am.\n\nThis city gave me freedom. It connected me to the world and shaped me into the person I am today. Curious, creative and fascinated by culture, art, architecture, nature, and the rhythm of life."
      },
      { key: "about.guide.title", label: "Guide – title", type: "short", fallback: "The Guide" },
      { key: "about.guide.kicker", label: "Guide – kicker", type: "short", fallback: "Helping you find your own way" },
      {
        key: "about.guide.body",
        label: "Guide – paragraph",
        type: "rich",
        fallback: "For me, discovering places should feel personal, relaxed and natural. More like spending time with a local friend.\n\nI always listen first. Every person experiences a place differently, which is why I take the time to understand who you are and what inspires you.\n\nI carefully shape each day around you, creating experiences that feel meaningful. More than anything, I’m simply somebody who walks beside you during your trip."
      }
    ]
  },
  {
    id: "process",
    title: "How I Work",
    description: "The 4-step process intro and the concierge sub-heading.",
    fields: [
      { key: "process.kicker", label: "Kicker", type: "short", fallback: "How I Work" },
      {
        key: "process.title",
        label: "Section title",
        type: "long",
        fallback: "Every journey starts with a conversation. Every experience is shaped around you."
      },
      {
        key: "process.intro",
        label: "Intro paragraph",
        type: "rich",
        fallback: "From the first message to the last goodbye, you’ll always have someone local by your side."
      },
      { key: "concierge.kicker", label: "Concierge kicker", type: "short", fallback: "What I take care of" },
      {
        key: "concierge.title",
        label: "Concierge title",
        type: "long",
        fallback: "More than a guide. Personal support, thoughtful guidance and local knowledge throughout your stay."
      },
      { key: "process.step1.label", label: "Step 1 – label", type: "short", fallback: "Let’s Connect" },
      {
        key: "process.step1.text",
        label: "Step 1 – text",
        type: "long",
        fallback: "You reach out, and we plan a personal video call to get to know each other and your travel plans."
      },
      { key: "process.step2.label", label: "Step 2 – label", type: "short", fallback: "Getting to Know You" },
      {
        key: "process.step2.text",
        label: "Step 2 – text",
        type: "long",
        fallback: "I take the time to listen. Your interests, travel style and wishes help shape the experience."
      },
      { key: "process.step3.label", label: "Step 3 – label", type: "short", fallback: "Creating Your Journey" },
      {
        key: "process.step3.text",
        label: "Step 3 – text",
        type: "long",
        fallback: "Together, we shape an experience that feels personal and completely tailored to you."
      },
      { key: "process.step4.label", label: "Step 4 – label", type: "short", fallback: "I Take Care of the Details" },
      {
        key: "process.step4.text",
        label: "Step 4 – text",
        type: "long",
        fallback: "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of."
      }
    ]
  },
  {
    id: "booking",
    title: "Booking / Contact",
    description: "The 'Let's See if We're a Good Match' section and the form intro.",
    fields: [
      { key: "booking.kicker", label: "Kicker", type: "short", fallback: "Get in Touch" },
      {
        key: "booking.title",
        label: "Section title",
        type: "long",
        fallback: "Let's See if We're a Good Match"
      },
      {
        key: "booking.intro",
        label: "Intro paragraph",
        type: "rich",
        fallback: "Send me a message, and I’ll reply within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each other."
      },
      { key: "booking.form.title", label: "Form title", type: "short", fallback: "Let’s Connect" },
      {
        key: "booking.form.intro",
        label: "Form intro",
        type: "rich",
        fallback: "Leave your contact details and tell me a little about yourself and the experience you're hoping for."
      },
      { key: "booking.form.cta", label: "Submit button label", type: "short", fallback: "Reach out" }
    ]
  },
  {
    id: "also",
    title: "Also (Podcast & Speaking)",
    description: "The quiet 'Also' strip just before the contact section.",
    fields: [
      { key: "also.podcast.title", label: "Podcast – title", type: "short", fallback: "Two Stories, One City" },
      {
        key: "also.podcast.body",
        label: "Podcast – body",
        type: "long",
        fallback: "My podcast. Two Amsterdammers, one place, one conversation at a time."
      },
      { key: "also.podcast.url", label: "Podcast – link URL", type: "short", fallback: "#" },
      { key: "also.speaking.title", label: "Speaking – title", type: "short", fallback: "Invite me to speak" },
      {
        key: "also.speaking.body",
        label: "Speaking – body",
        type: "long",
        fallback: "I talk to groups, schools and conferences about Amsterdam, storytelling, and the way we travel."
      }
    ]
  },
  {
    id: "trust",
    title: "Trust Signals",
    description: "Tripadvisor rating and review count shown in the reviews section.",
    fields: [
      {
        key: "tripadvisor.rating",
        label: "Tripadvisor rating",
        type: "short",
        fallback: "5.0",
        hint: "Example: 5.0"
      },
      {
        key: "tripadvisor.review_count",
        label: "Tripadvisor review count",
        type: "short",
        fallback: "218",
        hint: "A whole number, e.g. 218"
      }
    ]
  }
];
(_O = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _O.call(globalThis, "src/components/RichTextEditor.tsx");
const toolbarBtn = (active) => cn(
  "h-8 w-8 p-0",
  active && "bg-primary text-primary-foreground hover:bg-primary/90"
);
const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }
      }),
      Link$1.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "underline text-primary"
        }
      })
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2 font-body"
      }
    },
    onUpdate: ({ editor: editor2 }) => {
      const html = editor2.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    }
  });
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "<p></p>";
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);
  if (!editor) return null;
  const setLink = () => {
    const previous = editor.getAttributes("link").href;
    const url2 = window.prompt("Link URL", previous ?? "https://");
    if (url2 === null) return;
    if (url2 === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url2 }).run();
  };
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-md bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 border-b p-1", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("heading", { level: 2 })),
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          title: "Heading 2",
          children: /* @__PURE__ */ jsx(Heading2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("heading", { level: 3 })),
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          title: "Heading 3",
          children: /* @__PURE__ */ jsx(Heading3, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-px bg-border mx-1" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("bold")),
          onClick: () => editor.chain().focus().toggleBold().run(),
          title: "Bold",
          children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("italic")),
          onClick: () => editor.chain().focus().toggleItalic().run(),
          title: "Italic",
          children: /* @__PURE__ */ jsx(Italic, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-px bg-border mx-1" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("bulletList")),
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          title: "Bulleted list",
          children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("orderedList")),
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          title: "Numbered list",
          children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-px bg-border mx-1" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: toolbarBtn(editor.isActive("link")),
          onClick: setLink,
          title: "Add / edit link",
          children: /* @__PURE__ */ jsx(Link$2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "h-8 w-8 p-0",
          onClick: () => editor.chain().focus().unsetLink().run(),
          disabled: !editor.isActive("link"),
          title: "Remove link",
          children: /* @__PURE__ */ jsx(Unlink, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-px bg-border mx-1" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "h-8 w-8 p-0",
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().undo(),
          title: "Undo",
          children: /* @__PURE__ */ jsx(Undo2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "h-8 w-8 p-0",
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().redo(),
          title: "Redo",
          children: /* @__PURE__ */ jsx(Redo2, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor })
  ] });
};
(_P = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _P.call(globalThis, "src/pages/AdminSettings.tsx");
const PREVIEW_ROUTES = [
  { path: "/#about", label: "About" },
  { path: "/#how-it-works", label: "How I Work" },
  { path: "/#booking", label: "Booking" },
  { path: "/", label: "Full homepage" }
];
const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const [published, setPublished] = useState({});
  const [draftFlags, setDraftFlags] = useState({});
  const [busySection, setBusySection] = useState(null);
  const [busyAction, setBusyAction] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState("draft");
  const [previewPath, setPreviewPath] = useState(PREVIEW_ROUTES[0].path);
  const iframeRef = useRef(null);
  const fetchAll = async () => {
    const { data: rows } = await supabase.from("site_content").select("key,value,draft_value,has_draft,draft_updated_at,published_at");
    const pub = {};
    const editing = {};
    const flags = {};
    (rows || []).forEach((r) => {
      pub[r.key] = r.value ?? "";
      flags[r.key] = !!r.has_draft;
      editing[r.key] = r.has_draft ? r.draft_value ?? "" : r.value ?? "";
    });
    CONTENT_SCHEMA.forEach(
      (s) => s.fields.forEach((f) => {
        if (editing[f.key] === void 0) editing[f.key] = f.fallback;
        if (pub[f.key] === void 0) pub[f.key] = "";
        if (flags[f.key] === void 0) flags[f.key] = false;
      })
    );
    setPublished(pub);
    setValues(editing);
    setDraftFlags(flags);
  };
  useEffect(() => {
    let mounted = true;
    (async () => {
      await fetchAll();
      if (mounted) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const pushToPreview = (next) => {
    var _a2;
    const win = (_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow;
    if (!win) return;
    win.postMessage({ type: "site-content-preview", values: next }, "*");
  };
  const previewValues = previewMode === "draft" ? values : published;
  useEffect(() => {
    if (!previewOpen) return;
    pushToPreview(previewValues);
  }, [values, published, previewMode, previewOpen]);
  useEffect(() => {
    if (!previewOpen) return;
    const handler = (event) => {
      var _a2;
      if (((_a2 = event.data) == null ? void 0 : _a2.type) === "site-content-preview-ready") {
        pushToPreview(previewValues);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [previewValues, previewOpen]);
  const sectionHasPendingDraft = (sectionId) => {
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return false;
    return section.fields.some((f) => draftFlags[f.key]);
  };
  const totalPendingDrafts = Object.values(draftFlags).filter(Boolean).length;
  const saveDraft = async (sectionId) => {
    setBusySection(sectionId);
    setBusyAction("save");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      // Keep value (published) untouched; only update draft fields.
      value: published[f.key] ?? "",
      draft_value: values[f.key] ?? "",
      has_draft: true,
      draft_updated_at: now
    }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast$1.error(error.message);
      return;
    }
    await fetchAll();
    toast$1.success(`${section.title} saved as draft`);
  };
  const publishSection = async (sectionId) => {
    setBusySection(sectionId);
    setBusyAction("publish");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      value: values[f.key] ?? "",
      draft_value: null,
      has_draft: false,
      draft_updated_at: null,
      published_at: now
    }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast$1.error(error.message);
      return;
    }
    await refreshSiteContent();
    await fetchAll();
    toast$1.success(`${section.title} published`);
  };
  const discardDraft = async (sectionId) => {
    if (!confirm("Discard the draft for this section? This cannot be undone.")) return;
    setBusySection(sectionId);
    setBusyAction("discard");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      value: published[f.key] ?? "",
      draft_value: null,
      has_draft: false,
      draft_updated_at: null
    }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast$1.error(error.message);
      return;
    }
    await fetchAll();
    toast$1.success(`${section.title} draft discarded`);
  };
  const publishAll = async () => {
    if (totalPendingDrafts === 0) return;
    if (!confirm(`Publish all ${totalPendingDrafts} pending draft change(s)?`)) return;
    setBusyAction("publish-all");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const rows = Object.entries(draftFlags).filter(([, has]) => has).map(([key]) => {
      const section = CONTENT_SCHEMA.find((s) => s.fields.some((f) => f.key === key));
      return {
        key,
        section: (section == null ? void 0 : section.id) ?? "general",
        value: values[key] ?? "",
        draft_value: null,
        has_draft: false,
        draft_updated_at: null,
        published_at: now
      };
    });
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setBusyAction(null);
    if (error) {
      toast$1.error(error.message);
      return;
    }
    await refreshSiteContent();
    await fetchAll();
    toast$1.success("All drafts published");
  };
  if (loading) {
    return /* @__PURE__ */ jsx("main", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-muted/30 py-8 px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: previewOpen ? "max-w-[1600px] mx-auto" : "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-8 flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin",
            className: "inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground mb-4",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
              " Back to Stories"
            ]
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl text-primary", children: "Site content" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Save edits as drafts, preview them, and publish when ready." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        totalPendingDrafts > 0 && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "default",
            onClick: publishAll,
            disabled: busyAction === "publish-all",
            children: [
              /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
              busyAction === "publish-all" ? "Publishing..." : `Publish all (${totalPendingDrafts})`
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: previewOpen ? "default" : "outline",
            onClick: () => setPreviewOpen((v) => !v),
            children: previewOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4 mr-2" }),
              " Hide preview"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
              " Show live preview"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: previewOpen ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start" : "",
        children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: CONTENT_SCHEMA.map((section) => {
            const hasDraft = sectionHasPendingDraft(section.id);
            const busy = busySection === section.id;
            return /* @__PURE__ */ jsxs(
              "section",
              {
                className: "bg-card border rounded-lg p-6 shadow-sm space-y-4",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl text-primary", children: section.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-muted-foreground", children: section.description })
                    ] }),
                    hasDraft ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
                      /* @__PURE__ */ jsx(CircleDashed, { className: "w-3 h-3" }),
                      " Draft pending"
                    ] }) : /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "gap-1 text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
                      " Published"
                    ] })
                  ] }),
                  section.fields.map((field) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: field.key, children: field.label }),
                    field.type === "rich" ? /* @__PURE__ */ jsx(
                      RichTextEditor,
                      {
                        value: values[field.key] ?? "",
                        onChange: (html) => setValues((v) => ({ ...v, [field.key]: html }))
                      }
                    ) : field.type === "long" ? /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: field.key,
                        rows: 3,
                        value: values[field.key] ?? "",
                        onChange: (e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))
                      }
                    ) : /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: field.key,
                        value: values[field.key] ?? "",
                        onChange: (e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))
                      }
                    ),
                    field.hint && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: field.hint })
                  ] }, field.key)),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-end gap-2 pt-2 border-t", children: [
                    hasDraft && /* @__PURE__ */ jsxs(
                      Button,
                      {
                        variant: "ghost",
                        onClick: () => discardDraft(section.id),
                        disabled: busy,
                        children: [
                          /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                          "Discard draft"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Button,
                      {
                        variant: "outline",
                        onClick: () => saveDraft(section.id),
                        disabled: busy,
                        children: [
                          /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
                          busy && busyAction === "save" ? "Saving..." : "Save draft"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Button,
                      {
                        onClick: () => publishSection(section.id),
                        disabled: busy,
                        children: [
                          /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
                          busy && busyAction === "publish" ? "Publishing..." : "Publish"
                        ]
                      }
                    )
                  ] })
                ]
              },
              section.id
            );
          }) }),
          previewOpen && /* @__PURE__ */ jsx("aside", { className: "lg:sticky lg:top-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border rounded-lg shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 p-3 border-b bg-muted/40", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mr-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: previewMode === "draft" ? "default" : "outline",
                    onClick: () => setPreviewMode("draft"),
                    children: "Draft"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: previewMode === "published" ? "default" : "outline",
                    onClick: () => setPreviewMode("published"),
                    children: "Published"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("span", { className: "w-px h-5 bg-border" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-body text-muted-foreground", children: "Jump to:" }),
              PREVIEW_ROUTES.map((r) => /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: previewPath === r.path ? "secondary" : "ghost",
                  onClick: () => setPreviewPath(r.path),
                  children: r.label
                },
                r.path
              ))
            ] }),
            /* @__PURE__ */ jsx(
              "iframe",
              {
                ref: iframeRef,
                src: previewPath,
                title: "Live preview",
                className: "w-full h-[80vh] bg-background",
                onLoad: () => pushToPreview(previewValues)
              },
              previewPath
            )
          ] }) })
        ]
      }
    )
  ] }) });
};
(_Q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Q.call(globalThis, "src/components/AdminRoute.tsx");
const AdminRoute = ({ children }) => {
  const [state, setState] = useState("checking");
  const location = useLocation();
  useEffect(() => {
    let mounted = true;
    const check = async (userId) => {
      if (!userId) {
        if (mounted) setState("denied");
        return;
      }
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
      if (!mounted) return;
      if (error || !data) {
        toast$1.error("Your account does not have admin access.");
        await supabase.auth.signOut();
        setState("denied");
        return;
      }
      setState("allowed");
    };
    supabase.auth.getSession().then(({ data }) => {
      var _a2;
      return check((_a2 = data.session) == null ? void 0 : _a2.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e2, session) => {
      check(session == null ? void 0 : session.user.id);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  if (state === "checking") {
    return /* @__PURE__ */ jsx("main", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-muted-foreground", children: "Loading..." }) });
  }
  if (state === "denied") {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", replace: true, state: { from: location.pathname } });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
(_R = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _R.call(globalThis, "src/pages/NotFound.tsx");
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Page not found – Dennis Gerrits" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "This page does not exist. Return to the homepage of Dennis Gerrits, personal travel companion and storyteller in Amsterdam."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, follow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
    ] })
  ] });
};
(_S = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _S.call(globalThis, "src/routes.tsx");
async function fetchStories() {
  const { data } = await supabase.from("stories").select("id, slug, title, intro, body, sort_order").order("sort_order", { ascending: true });
  return data ?? [];
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Index, {}) },
      { path: "get-inspired", element: /* @__PURE__ */ jsx(GetInspired, {}) },
      { path: "interests", element: /* @__PURE__ */ jsx(GetInspired, {}) },
      { path: "travel-agents", element: /* @__PURE__ */ jsx(TravelAgents, {}) },
      {
        path: "notebook",
        element: /* @__PURE__ */ jsx(NotebookIndex, {}),
        loader: async () => ({ stories: await fetchStories() })
      },
      {
        path: "notebook/:slug",
        element: /* @__PURE__ */ jsx(NotebookStory, {}),
        loader: async ({ params }) => {
          const stories = await fetchStories();
          return {
            stories,
            story: stories.find((s) => s.slug === params.slug) ?? null
          };
        },
        getStaticPaths: async () => {
          const stories = await fetchStories();
          return stories.map((s) => `/notebook/${s.slug}`);
        }
      },
      { path: "admin/login", element: /* @__PURE__ */ jsx(AdminLogin, {}) },
      {
        path: "admin",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(Admin, {}) })
      },
      {
        path: "admin/settings",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(AdminSettings, {}) })
      },
      { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }
    ]
  }
];
(_T = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _T.call(globalThis, "src/main.tsx");
const createRoot = ViteReactSSG({ routes });
export {
  createRoot
};
