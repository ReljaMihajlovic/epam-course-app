export interface ButtonProps {
    buttonText?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.FC;
    className?: string;
    type?: 'button' | 'submit'
}
