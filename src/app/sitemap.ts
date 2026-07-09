import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://core829.net";

  const slugRoutes = [
    "/services/rent-webapps",
    "/services/web-design",
    "/services/app-development",
    "/services/executable-software",
    "/services/social-media",
    "/services/crm",
    "/services/ai-automation",
  ];

  const workRoutes = [
    "/work/bidwyz",
    "/work/winex-advance",
    "/work/kranely",
    "/work/outlier",
    "/work/zelo",
    "/work/airlaw",
    "/work/ml-inference",
  ];

  const routes = [
    "",
    "/services",
    ...slugRoutes,
    "/work",
    ...workRoutes,
    "/usecases",
    "/process",
    "/about",
    "/pricing",
    "/contact",
    "/work-with-us",
    "/login",
    "/signup",
    "/legal/privacy",
    "/legal/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
