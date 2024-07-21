import App from "@/App";
import { LabelingTool } from "@/components";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LabelingTool />,
      },
    ],
  },
]);
