interface InputProps {
    value?: string | number,
    type?: "text" | "email" | "password" | "textarea" | 'number';
    labelText?: string;
    placeholderText?: string;
    errorMsg?: string;
    inputId?: string;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}
