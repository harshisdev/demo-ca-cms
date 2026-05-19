export default function Loader() {
  return (
    <div className="flex justify-center">
      <p className="text-black text-xl font-semibold flex items-center">
        Loading
        <span className="ml-1 flex">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </span>
      </p>
    </div>
  );
}
