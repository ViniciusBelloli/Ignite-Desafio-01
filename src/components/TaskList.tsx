import { CheckCircle, Circle, Trash } from 'phosphor-react';

import styles from './TaskList.module.css';

interface Task {
    checked: boolean;
    name: string;
}

interface TaskProps {
    task: Task;
    onDeleteComment: (comment: string) => void;
    onClickIcon: (task: Task) => void;
}

export function TaskList({ task, onDeleteComment, onClickIcon }: TaskProps) {
    return (
        <div className={styles.taskList}>
            {task.checked ?
                <div className={styles.taskChecked}>
                    <CheckCircle onClick={() => onClickIcon(task)} className={styles.checkCircleIcon} size={24} />
                </div>
                :
                <div className={styles.taskUnchecked}>
                    <Circle onClick={() => onClickIcon(task)} className={styles.circleIcon} size={24} />
                </div>
            }

            <p className={task.checked ? styles.taskChecked : styles.taskUnchecked}>{task.name}</p>

            <Trash onClick={() => onDeleteComment(task.name)} className={styles.trashIcon} size={24} />
        </div>
    )
}