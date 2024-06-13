import useLogin from "../hooks/useLogin";
import { STRING_EMPTY } from "../../../constant/core";
import FormInputText from "../../../components/Form/FormInputText";
import MyButton from "../../../components/MyButton";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ className }) => {
  const [handleSubmit, isSubmitting, control] = useLogin();

  return (
    <form
      className={className ?? STRING_EMPTY}
      onSubmit={handleSubmit}
      noValidate
      spellCheck={false}
    >
      <div className="w-full flex flex-col gap-4 bg-[#161616]/60 p-5 desktop:p-12 rounded-[15px] border border-zinc-800">
        <FormInputText
          control={control}
          id="code"
          name="code"
          autoFocus
          autoComplete="off"
          label="Identifying code *"
        />
        <FormInputText isPassword control={control} label="Password *" />
        <MyButton
          variant="contained"
          className="!h-10 desktop:!h-12 !p-2 !rounded-[5px]"
          type="submit"
          disabled={isSubmitting}
        >
          Join
        </MyButton>
      </div>
    </form>
  );
};

export default LoginForm;
