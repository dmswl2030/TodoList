import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); //모든 toDo를 저장하는 toDos
    const category = get(categoryState); //category의 상태를 저장
    return toDos.filter((toDo) => toDo.category === category); //카테고리와 일치하는 목록만 보여주기
  },
});
