import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useState<string[]>(
    Object.values(Categories)
  ); //기존 카테고리를 초기값으로 설정
  const [category, setCategory] = useRecoilState(categoryState);
  const [data, setData] = useState({});
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    const newCategory = data.category as Categories; // 입력한 카테고리 값을 가져옴

    if (!categories.includes(newCategory)) {
      // 입력한 카테고리가 이미 존재하는지 확인
      setCategories([...categories, newCategory]); // 존재하지 않으면 배열에 추가
    }

    setCategory(newCategory);
    setData((prev) => ({
      ...prev,
      [newCategory]: [],
    }));

    return data;
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input {...register("category")} placeholder="Write your category" />
          <button>Add</button>
        </form>
        <h2>Category</h2>
        <select value={category} onInput={onInput}>
          {categories.map((newcategory) => (
            <option key={newcategory} value={newcategory}>
              {newcategory}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
      </div>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
