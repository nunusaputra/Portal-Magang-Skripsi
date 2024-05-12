import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
  
  const JobsCard = ({ item }) => {
    const { jobTitle, image, desc } = item;
    return (
      <Card className="mt-6 w-96 mb-3">
        <CardHeader className="relative h-56 bg-[#D9D9D9]">
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-contain"
          />
        </CardHeader>
        <CardBody>
          <h2 className="text-[20px] font-semibold text-blackColor mb-3">
            {jobTitle}
          </h2>
          <p className="text-para">{desc}</p>
        </CardBody>
        <CardFooter className="pt-0">
          <button className="btn w-full">Lihat Detail</button>
        </CardFooter>
      </Card>
    );
  };
  
  export default JobsCard;
  