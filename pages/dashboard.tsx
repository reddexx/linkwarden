import useCollectionStore from "@/store/collections";
import { faArrowRight, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "@/layouts/MainLayout";
import useLinkStore from "@/store/links";
import useTagStore from "@/store/tags";
import LinkItem from "@/components/Dashboard/LinkItem";
import Link from "next/link";
import CollectionItem from "@/components/Dashboard/CollectionItem";
import { useEffect, useState } from "react";

export default function () {
  const { collections } = useCollectionStore();
  const { links } = useLinkStore();
  const { tags } = useTagStore();

  const [sortedCollections, setSortedCollections] = useState([]);

  useEffect(() => {
    const collectionsWithLinkCount = collections.map((collection) => {
      const linkCount = links.filter(
        (link) => link.collectionId === collection.id
      ).length;
      return { ...collection, linkCount };
    });

    setSortedCollections(
      collectionsWithLinkCount.sort((a, b) => b.linkCount - a.linkCount) as any
    );
  }, [collections]);

  return (
    // ml-80
    <MainLayout>
      <div className="p-5">
        <div className="flex gap-3 items-center mb-5">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faChartSimple}
              className="w-5 h-5 text-sky-300"
            />
            <p className="text-lg text-sky-900">Dashboard</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-evenly gap-2 mb-10">
          <div className="flex items-baseline gap-2">
            <p className="text-sky-500 font-bold text-6xl">{links.length}</p>
            <p className="text-sky-900 text-xl">Links</p>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sky-500 font-bold text-6xl">
              {collections.length}
            </p>
            <p className="text-sky-900 text-xl">Collections</p>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sky-500 font-bold text-6xl">{tags.length}</p>
            <p className="text-sky-900 text-xl">Tags</p>
          </div>
        </div>

        <div className="flex flex-col 2xl:flex-row items-start justify-evenly gap-5">
          <div className="flex flex-col gap-2 p-2 bg-gray-100 border border-sky-100 rounded-md w-full">
            <div className="flex justify-between gap-2 items-baseline">
              <p className="text-sky-600 text-xl mb-2">Recently added Links</p>
              <Link href="/links">
                <div className="text-sky-600 flex items-center gap-1 hover:border-b-sky-500 duration-100 hover:border-b">
                  View All
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-4 h-4 text-sky-300"
                  />
                </div>
              </Link>
            </div>
            {links
              .sort(
                (a, b) =>
                  new Date(b.createdAt as string).getTime() -
                  new Date(a.createdAt as string).getTime()
              )
              .slice(0, 5)
              .map((e, i) => (
                <LinkItem key={i} link={e} count={i} />
              ))}
          </div>

          <div className="flex flex-col gap-2 p-2 bg-gray-100 border border-sky-100 rounded-md w-full">
            <div className="flex justify-between gap-2 items-baseline">
              <p className="text-sky-600 text-xl mb-2">Top Collections</p>
              <Link href="/collections">
                <div className="text-sky-600 flex items-center gap-1 hover:border-b-sky-500 duration-100 hover:border-b">
                  View All
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-4 h-4 text-sky-300"
                  />
                </div>
              </Link>
            </div>
            {sortedCollections.map((e, i) => (
              <CollectionItem key={i} collection={e} />
            ))}
          </div>

          <div className="flex flex-col gap-2 p-2 bg-gray-100 border border-sky-100 rounded-md w-full">
            <div className="flex justify-between gap-2 items-baseline">
              <p className="text-sky-600 text-xl mb-2">Top Tags</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.slice(0, 19).map((e, i) => (
                <Link
                  href={`/tags/${e.id}`}
                  key={i}
                  className="px-2 py-1 bg-sky-200 rounded-full hover:bg-sky-100 duration-100 text-sky-700"
                >
                  # {e.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}