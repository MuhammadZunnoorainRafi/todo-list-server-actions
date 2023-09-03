import { revalidatePath } from 'next/cache';
import { toast } from 'react-toastify';

async function addTodo(data: FormData) {
  'use server';
  const text = data.get('title');
  try {
    const res = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      throw new Error('Fetching failed');
    }
    revalidatePath('/');
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getTodo() {
  const res = await fetch('http://localhost:3000/api/todos');
  const data = await res.json();

  return data;
}

export default async function Home() {
  const todos = await getTodo();
  return (
    <div>
      <h1 className=" font-bold text-3xl text-center py-2">Todo 🐢</h1>
      <form action={addTodo}>
        <div className="flex mb-2 gap-2 items-center justify-center">
          <input
            name="title"
            className=" flex-grow input input-md border border-slate-500 rounded-lg w-full"
            type="text"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      {todos.map((val) => {
        return (
          <p
            className="text-center text-slate-800 my-2 py-2 rounded-lg border-slate-300 bg-slate-200"
            key={val._id}
          >
            {val.title}
          </p>
        );
      })}
    </div>
  );
}
