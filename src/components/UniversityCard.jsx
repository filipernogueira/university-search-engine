import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const UniversityCard = ({ university }) => {
    return (
        <>
            <Card className="mt-6 w-96 h-64">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {university.name}
                    </Typography>

                    <Typography>
                        <span style={{ fontWeight: "bold" }}>
                            {university.alpha_two_code}
                        </span>
                        : {university.country}
                    </Typography>
                    <div className="mt-3">
                        {university.world_rank && (
                            <Typography>
                                <>
                                    <span style={{ fontWeight: "bold" }}>
                                        #{university.world_rank}
                                    </span>
                                    <span> World</span>
                                </>
                            </Typography>
                        )}
                        {university.country_rank && (
                            <Typography>
                                <>
                                    <span style={{ fontWeight: "bold" }}>
                                        #{university.country_rank}
                                    </span>
                                    <span> {university.alpha_two_code}</span>
                                </>
                            </Typography>
                        )}
                    </div>

                    {/* Another way of presenting the Rankings
                    (university.world_rank || university.country_rank) && (
                        <div className="flex items-center mt-2">
                            {university.world_rank && (
                                <div className="flex flex-col justify-center items-center w-14 p-1 bg-gray-600 text-white font-semibold rounded-md shadow-lg">
                                    <span className="text-sm">
                                        #{university.world_rank}
                                    </span>

                                    <span className="text-sm">World</span>
                                </div>
                            )}

                            {university.country_rank && (
                                <div
                                    className={`flex flex-col justify-center items-center w-14 p-1 bg-gray-600 text-white font-semibold rounded-md shadow-lg ${
                                        university.world_rank && "ml-2"
                                    }`}
                                >
                                    <span className="text-sm">
                                        #{university.country_rank}
                                    </span>
                                    <span className="text-sm">
                                        {university.alpha_two_code}
                                    </span>
                                </div>
                            )}
                        </div>
                    )*/}
                </CardBody>
                <CardFooter className="mt-auto pt-0">
                    <a
                        href={
                            university.web_pages[0] !== "h"
                                ? university.web_pages[0]
                                : university.web_pages
                        }
                        target="_blank"
                        className="inline-block"
                    >
                        <Button
                            size="sm"
                            variant="text"
                            className="flex items-center gap-2"
                        >
                            Learn More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </>
    );
};

export default UniversityCard;
