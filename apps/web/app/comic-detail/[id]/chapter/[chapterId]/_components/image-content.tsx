import CustomImage from "@/components/custom-image";

export default function ImageContent({ imgList }: { imgList: string[] }) {
  return (
    <div className="flex flex-col h-full w-full items-center">
      {imgList.map((img, index) => (
        <CustomImage
          key={index}
          className="w-ful"
          imgProps={{ src: img, loading: "lazy" }}
        />
      ))}
      <span className="text-center py-4 text-muted-foreground">
        总得有个结尾吧～
      </span>
    </div>
  );
}
