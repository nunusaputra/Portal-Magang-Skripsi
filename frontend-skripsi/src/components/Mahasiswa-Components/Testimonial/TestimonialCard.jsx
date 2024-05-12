import React from "react";
const TestimonialCard = ({item}) => {
    const {name, image, company, word} = item
  return (
    <div className="mt-[30px] lg:mt-[25px] bg-[#B6B6B6] rounded-xl drop-shadow-xl">
            <div className="py-[30px] px-5 rounded-3">
                <div className="flex items-center gap-[13px]">
                    <img src={image} alt="" />
                    <div>
                        <h4 className="text-[18px] leading-[30px] text-blackColor font-[800]">
                            {name}
                        </h4>
                        <div className="flex items-center gap-[2px] text-blackColor font-[800]">
                            {company}
                        </div>
                    </div>
                </div>
                <p className="text-[16px] leading-7 font-[400] text-blackColor mt-4">
                    {word}
                </p>
            </div>
    </div>
  );
};

export default TestimonialCard;
