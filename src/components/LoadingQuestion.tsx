import Image from "next/image";

type Props = {};

const LoadingQuestion = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
      <Image
        src={"/loading.gif"}
        height={400}
        width={500}
        alt="Loading animation"
      />
    </div>
  );
};

export default LoadingQuestion;
