import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const UniversityCard = ({ university }) => {
    function getFormattedUrl(url) {
        let formattedUrl = url.replace(/^(https?:\/\/)?/, "");

        formattedUrl = formattedUrl.replace(/\/+$/, "");

        return formattedUrl;
    }

    return (
        <>
            <Card className="mt-6 w-96 h-60">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {university.name}
                    </Typography>
                    <Typography>
                        {university.alpha_two_code}: {university.country}
                    </Typography>
                </CardBody>
                <CardFooter className="mt-auto pt-0">
                    <a
                        href={university.web_pages[0]}
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
