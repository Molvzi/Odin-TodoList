import './style.css';

const TodoLists = [
    {
        id: 1,
        title: 'Todo 1',
        description: 'Description 1',
        dueDate: '2024-11-21',
        priority: 'high',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Todo 2',
        description: 'Description 2',
    },
    {
        id: 3,
        title: 'Todo 3',
        description: 'Description 3',
    },
]

class Todo {
    constructor(title, description, dueDate, priority = 'normal', isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.createdAt = new Date();
        this.id = Date.now().toString(); // 简单的唯一ID生成
    }

    toggleComplete() {
        this.isCompleted = !this.isCompleted;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    edit(newTitle, newDescription, newDueDate) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
    }
}

const todoForm = document.getElementById('todo-form');
const todoListItems = document.getElementById('todo-list-items');

todoListItems.innerHTML = '';

TodoLists.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    li.innerHTML = `
        <div class="todo-content">
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            ${todo.dueDate ? `<div class="due-date">截止日期: ${todo.dueDate}</div>` : ''}
            ${todo.priority ? `<div class="priority ${todo.priority}">优先级: ${todo.priority}</div>` : ''}
        </div>
        <div class="todo-actions">
            <button class="delete-btn">删除</button>
            <label class="checkbox-wrapper">
                <input type="checkbox" ${todo.isCompleted ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
        </div>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        todo.isCompleted = checkbox.checked;
        li.classList.toggle('completed', todo.isCompleted);
    })

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const index = TodoLists.findIndex(t => t.id === todo.id);
        if (index !== -1) {
            TodoLists.splice(index, 1);
            li.remove();  // 直接移除当前元素
        }
    });

    todoListItems.appendChild(li);
});

// 添加表单提交事件处理
todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 阻止表单默认提交

    // 获取表单数据
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    // 创建新的待办事项对象
    const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        isCompleted: false,
        createdAt: new Date()
    };

    // 添加到数组
    TodoLists.push(newTodo);

    // 创建新的列表项
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = newTodo.id;

    li.innerHTML = `
        <div class="todo-content">
            <h3>${newTodo.title}</h3>
            <p>${newTodo.description}</p>
            ${newTodo.dueDate ? `<div class="due-date">截止日期: ${newTodo.dueDate}</div>` : ''}
            ${newTodo.priority ? `<div class="priority ${newTodo.priority}">优先级: ${newTodo.priority}</div>` : ''}
        </div>
        <div class="todo-actions">
            <button class="delete-btn">删除</button>
            <label class="checkbox-wrapper">
                <input type="checkbox" ${newTodo.isCompleted ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
        </div>
    `;

    // 添加事件监听
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        newTodo.isCompleted = checkbox.checked;
        li.classList.toggle('completed', newTodo.isCompleted);
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const index = TodoLists.findIndex(t => t.id === newTodo.id);
        if (index !== -1) {
            TodoLists.splice(index, 1);
            li.remove();
        }
    });

    // 添加到列表
    todoListItems.appendChild(li);

    // 重置表单
    todoForm.reset();
});
