import * as S from "./StylesImages";

type FrontendProps = {
  children: React.ReactNode;
};

const Frontend = ({ children }: FrontendProps) => {
  return (
    <S.Container>
      <main className="One-main">{children}</main>
    </S.Container>
  );
};

export default Frontend;
