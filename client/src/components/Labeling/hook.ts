import { useSleep } from "@/hooks";
import { useBoundStore } from "@/store";
// // import { useEngineDB } from '@engine-app/engine-db';
import { notification } from "antd";
import { useRef } from "react";

const useCreateNpy = () => {
  const setNpyRequests = useBoundStore((state) => state.setNpyRequests);
  const npyConfirms = useRef<string[]>([]);
  const npyCheckReload = useRef(0);
  // const { engineDBApi } = useEngineDB();

  const [api, contextHolder] = notification.useNotification();

  const createNpy = async (npyRequests: string[]) => {
    const newNpyRequests = [...npyRequests];
    const npyRequest = newNpyRequests.shift();

    if (!npyRequest) {
      npyConfirms.current = [];
      return;
    }

    if (npyConfirms.current.find((npyConfirm) => npyConfirm === npyRequest)) {
      // 2000번 => 100초
      // 2000번이 넘으면 문제가 있는 것으로 판단
      if (npyCheckReload.current === 2000) {
        api.open({
          type: "error",
          message: "스마트 라벨링 로드 실패",
          description: "엔진 종료 후 다시 실행시켜 주세요.",
          placement: "bottomRight",
        });
        return;
      }

      try {
        // const npyPath = await engineDBApi?.getNpy(npyRequest);

        // npy가 생성이 됐다면 zustand에서 제거
        // if (npyPath) {
        //   npyCheckReload.current = 0;
        //   setNpyRequests(newNpyRequests);
        //   return;
        // }

        // 없다면 생성이 될 때까지
        // 재귀로 다시 호출
        npyCheckReload.current++;
        await useSleep(500);
        createNpy(npyRequests);
        return;
      } catch (error) {
        console.log(error);
      }
    }

    npyConfirms.current = [...npyConfirms.current, npyRequest];

    try {
      // const res = await engineDBApi?.createNpyIfNotExist(npyRequest);

      // if (npyRequest !== res?.meta.data.target[0]) {
      //   createNpy(npyRequests);
      //   return;
      // }

      setNpyRequests(newNpyRequests);
    } catch (error) {
      console.log(error);
    }
  };

  return { contextHolder, createNpy };
};

export default useCreateNpy;
