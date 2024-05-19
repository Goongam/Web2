export default function ServiceInfoCardNone() {
  return (
    <div className="flex flex-col p-3 pb-5 w-full gap-6 items-center rounded-md font-bold shadow-lg">
      <button className="flex flex-col gap-28">
        <div className="flex p-8 bg-slate-100 rounded-lg justify-center">
          <img
            alt="제품 이미지"
            className="flex w-1/2"
            src="images/boothRegist/plus_symbol.png"
          />
        </div>
        <button className="rounded-md w-full h-full">물품 등록</button>
      </button>
    </div>
  );
}
