import { useEffect, useState } from "react";

interface Collections {
  id: any;
  name: string;
  role: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collections[]>([]);
  useEffect(() => {
    fetch("/api/routes/collections/getCollections")
      .then((res) => res.json())
      .then((data) => setCollections(data.response));
  }, []);

  return (
    <div className="flex flex-wrap">
      {collections.map((e) => {
        return (
          <div className="p-5 bg-gray-100 m-2 w-max ">
            <p>{e.name}</p>
          </div>
        );
      })}
    </div>
  );
}