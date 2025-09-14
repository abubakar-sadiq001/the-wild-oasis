import styled from "styled-components";

const StyledCheckbox = styled.input`
  /* display: flex;
  gap: 1.6rem; */

  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0;
  accent-color: var(--color-brand-600);

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export default StyledCheckbox;
