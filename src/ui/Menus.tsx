import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

StyledList.defaultProps = {
  position: { x: 0, y: 0 },
};

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface Position {
  x: number;
  y: number;
}

interface MenusContextType {
  openId: string | null;
  open?: (id: string) => void;
  close?: () => void;
  position: Position;
  setPosition?: (position: Position) => void;
}

const MenusContext = createContext<MenusContextType>({
  openId: null,
  position: { x: 0, y: 0 },
});

export default function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');

    if (button) {
      const rect = button.getBoundingClientRect();
      const newPosition = {
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      };
      setPosition?.(newPosition);
    }

    if (openId === id) {
      close?.();
    } else {
      open?.(id);
    }
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close);
  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close?.();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
