import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
import GetInspired from "./pages/GetInspired";
import TravelAgents from "./pages/TravelAgents";
import NotebookIndex from "./pages/NotebookIndex";
import NotebookStory from "./pages/NotebookStory";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSettings from "./pages/AdminSettings";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";
import { supabase } from "@/integrations/supabase/client";

export type StoryRecord = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  body: string;
  sort_order: number;
};

async function fetchStories(): Promise<StoryRecord[]> {
  const { data } = await supabase
    .from("stories")
    .select("id, slug, title, intro, body, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as StoryRecord[];
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "get-inspired", element: <GetInspired /> },
      { path: "interests", element: <GetInspired /> },
      { path: "travel-agents", element: <TravelAgents /> },
      {
        path: "notebook",
        element: <NotebookIndex />,
        loader: async () => ({ stories: await fetchStories() }),
      },
      {
        path: "notebook/:slug",
        element: <NotebookStory />,
        loader: async ({ params }) => {
          const stories = await fetchStories();
          return {
            stories,
            story: stories.find((s) => s.slug === params.slug) ?? null,
          };
        },
        getStaticPaths: async () => {
          const stories = await fetchStories();
          return stories.map((s) => `/notebook/${s.slug}`);
        },
      },
      { path: "admin/login", element: <AdminLogin /> },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/settings",
        element: (
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
