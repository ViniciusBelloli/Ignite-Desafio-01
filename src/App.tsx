import { ChangeEvent, FormEvent, useState } from 'react';
import { Header } from './components/Header';
import { PlusCircle, ClipboardText } from 'phosphor-react';
import { TaskList } from './components/TaskList';

import styles from './App.module.css';
import './global.css';

interface TaskPropsLocal {
  checked: boolean;
  name: string;
}

function App() {
  const [taskName, setTaskName] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
  const [taskList, setTaskList] = useState<TaskPropsLocal[]>([]);

  function AddNewTask(event: FormEvent) {
    event.preventDefault();

    setTaskList([...taskList, { checked: false, name: taskName }]);
    setTaskName("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleTaskComplete(task: TaskPropsLocal) {
    const taskNew = task
    taskNew.checked = !taskNew.checked;

    const tasksWithoutDeletedOne = taskList.filter(task => {
      return task.name !== taskNew.name;
    })

    setTaskList([...tasksWithoutDeletedOne, taskNew]);
    setCheckedCount(checkedCount + (taskNew.checked ? 1 : -1));
  }

  function deleteComment(commentToDelete: string) {
    const tasksWithoutDeletedOne = taskList.filter(task => {
      return task.name !== commentToDelete;
    })

    setTaskList(tasksWithoutDeletedOne);
  }

  return (
    <div>
      <Header />

      <form onSubmit={(e) => AddNewTask(e)} className={styles.addTask}>
        <input
          type="text"
          name="task"
          placeholder="Adicione uma nova tarefa"
          value={taskName}
          onChange={(e) => handleNewTaskChange(e)}
        />
        <button
          type="submit"
        >
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.taskInformation}>
        <label className={styles.createdTasks}>
          Tarefas Criadas

          <p>
            {taskList.length}
          </p>
        </label>

        <label className={styles.tasksDone}>
          Concluídas

          <p>
            {checkedCount}
          </p>
        </label>
      </div>

      {taskList.length === 0 ?
        <div className={styles.taskList}>
          <ClipboardText size={56} />
          <div className={styles.taskNone}>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        </div>
        :
        <div className={styles.taskListWithContent}>
          {
            taskList.map(task => {
              return (
                <TaskList
                  key={task.name}
                  task={task}
                  onDeleteComment={deleteComment}
                  onClickIcon={handleTaskComplete}
                />
              )
            })
          }
        </div>
      }
    </div >
  )
}

export default App
