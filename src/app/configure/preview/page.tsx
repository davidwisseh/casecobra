import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }
  let configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    return notFound();
  } else {
    while (!configuration?.croppedImageUrl) {
      configuration = await db.configuration.findUnique({
        where: { id },
      });
    }
    return <DesignPreview configuration={configuration}></DesignPreview>;
  }
};
export default Page;
