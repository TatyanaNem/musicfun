import { useCallback, useEffect, useRef } from "react";
import { useFetchTracksInfiniteQuery } from "../api/tracksApi";
import { TracksList } from "./TracksList/TracksList";

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFetchTracksInfiniteQuery();

  const pages = data?.pages.flatMap((page) => page.data) || [];
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMoreHandler = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );
    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMoreHandler]);

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={pages} />
      {hasNextPage && (
        <div ref={observerRef}>
          {isFetchingNextPage ? (
            <div>Loading more tracks...</div>
          ) : (
            <div style={{ height: "20px" }}></div>
          )}
        </div>
      )}
      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
    </div>
  );
};
