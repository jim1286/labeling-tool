import App from "@/App";
import { ProtectRouter } from "@/components";
import { HomePage, LabelingToolPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <ProtectRouter />,
        children: [
          {
            path: "/labeling",
            element: <LabelingToolPage />,
          },
        ],
      },
    ],
  },
]);
