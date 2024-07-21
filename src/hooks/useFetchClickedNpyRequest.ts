import { useBoundStore } from "@/store";
// import { useEngineDB } from '@engine-app/engine-db';

const useFetchClickedNpyRequest = () => {
  const setNpyRequests = useBoundStore((state) => state.setNpyRequests);
  const npyRequests = useBoundStore((state) => state.npyRequests);
  const ableNpyRequest = useBoundStore((state) => state.ableNpyRequest);
  // const selectedRevisionId = useBoundStore((state) => state.selectedRevisionId);
  // const { engineDBApi } = useEngineDB();

  const fetchClickedNpyRequest = async (clickedImageId: number) => {
    // if (!ableNpyRequest || !selectedRevisionId || !engineDBApi) {
    //   return;
    // }
    // const currentImageData = await engineDBApi.getImageWithLabelData({
    //   collectionRevisionId: selectedRevisionId,
    //   imageId: clickedImageId,
    // });
    // const requestIndex = npyRequests.findIndex(
    //   (npyRequest) => npyRequest === currentImageData.path
    // );
    // if (requestIndex === -1 || requestIndex === 0) {
    //   return;
    // }
    // const newNpyRequests = [...npyRequests];
    // const [clickedRequest] = newNpyRequests.splice(requestIndex, 1);
    // 2개를 넣는 이유
    // 이미 engine core에서 진행이 되고 있기 때문에
    // 첫 번째는 요청용
    // 두 번째는 npy 생성 확인용
    // setNpyRequests([clickedRequest, clickedRequest, ...newNpyRequests]);
  };

  return fetchClickedNpyRequest;
};

export default useFetchClickedNpyRequest;
