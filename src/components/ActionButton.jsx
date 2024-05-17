import { Button } from "@material-tailwind/react";

const ActionButton = ({ logo, text, onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="gradient"
            className="flex items-center gap-3"
        >
            {logo}
            {text}
        </Button>
    );
};

export default ActionButton;
