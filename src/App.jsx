import React from "react";
import { Header } from "./components/Header.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskTable } from "./components/TaskTable.jsx";
import { ZoomControls } from "./components/ZoomControls.jsx";
import { makeInitialTasks, statusOptions } from "./data/tasks.js";

function App() {
  const [activePage, setActivePage] = React.useState("tasks");
  const [tasks, setTasks] = React.useState(makeInitialTasks);
  const [searchText, setSearchText] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedTaskIds, setSelectedTaskIds] = React.useState([]);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [formMessage, setFormMessage] = React.useState("");
  const [zoom, setZoom] = React.useState(100);

  const selectedTaskId = selectedTaskIds.length === 1 ? selectedTaskIds[0] : null;
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const editingTask = tasks.find((task) => task.id === editingTaskId);

  const filteredTasks = tasks.filter((task) => {
    const search = searchText.trim().toLowerCase();

    const matchesSearch =
      task.name.toLowerCase().includes(search) || String(task.key).toLowerCase().includes(search);

    const matchesTab = activeTab === "all" || task.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const hasDuplicateTaskName = (taskName, ignoredTaskId = null) => {
    const normalizedName = taskName.trim().toLowerCase();

    // Normalizing keeps "Learn React" and " learn react " from becoming two tasks.
    return tasks.some(
      (task) => task.id !== ignoredTaskId && task.name.trim().toLowerCase() === normalizedName,
    );
  };

  function clearFormMessage() {
    setFormMessage("");
  }

  function addTask(taskName, taskStatus) {
    if (hasDuplicateTaskName(taskName)) {
      setFormMessage("A task with this name already exists.");
      return false;
    }

    const nextTask = {
      id: Date.now(),
      key: Math.max(...tasks.map((task) => Number(task.key) || 0), 0) + 1,
      name: taskName,
      status: taskStatus,
    };

    setTasks([...tasks, nextTask]);
    setFormMessage("");
    return true;
  }

  function saveTask(updatedTask) {
    if (hasDuplicateTaskName(updatedTask.name, updatedTask.id)) {
      setFormMessage("A task with this name already exists.");
      return false;
    }

    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTaskId(null);
    setSelectedTaskIds([updatedTask.id]);
    setFormMessage("");
    return true;
  }

  function selectTask(taskId) {
    setSelectedTaskIds((currentTaskIds) =>
      currentTaskIds.includes(taskId)
        ? currentTaskIds.filter((currentTaskId) => currentTaskId !== taskId)
        : [...currentTaskIds, taskId],
    );
    setEditingTaskId(null);
    clearFormMessage();
  }

  function selectAllVisibleTasks() {
    const visibleTaskIds = filteredTasks.map((task) => task.id);
    const areAllVisibleTasksSelected =
      visibleTaskIds.length > 0 && visibleTaskIds.every((taskId) => selectedTaskIds.includes(taskId));

    setSelectedTaskIds((currentTaskIds) => {
      if (areAllVisibleTasksSelected) {
        return currentTaskIds.filter((taskId) => !visibleTaskIds.includes(taskId));
      }

      return [...new Set([...currentTaskIds, ...visibleTaskIds])];
    });
    setEditingTaskId(null);
    clearFormMessage();
  }

  function clearSelectedTasks() {
    setSelectedTaskIds([]);
    setEditingTaskId(null);
    clearFormMessage();
  }

  function requestEdit(taskId) {
    if (selectedTaskIds.length !== 1 || selectedTaskId !== taskId) {
      setFormMessage("Select one task first, then choose Edit.");
      return;
    }

    setEditingTaskId(taskId);
    clearFormMessage();
  }

  function requestDelete(taskId) {
    if (!selectedTaskIds.includes(taskId)) {
      setFormMessage("Select a task first, then choose Delete.");
      return;
    }

    setTasks(tasks.filter((task) => !selectedTaskIds.includes(task.id)));
    setSelectedTaskIds([]);
    setEditingTaskId(null);
    clearFormMessage();
  }

  function zoomIn() {
    setZoom((currentZoom) => Math.min(currentZoom + 10, 150));
  }

  function zoomOut() {
    setZoom((currentZoom) => Math.max(currentZoom - 10, 80));
  }

  return (
    <main className="page">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <div
        className="dashboard-scale"
        style={{
          transform: `scale(${zoom / 100})`,
          width: `${10000 / zoom}%`,
        }}
      >
        {activePage === "home" ? (
          <section className="dashboard home-page">
            <header className="dashboard-header">
              <h1>Home Page</h1>
            </header>

            <div className="home-overview">
              <p className="home-kicker">Home Page</p>
              <h2>Task Board</h2>
              <div className="home-stats" aria-label="Task summary">
                <div>
                  <span>{tasks.length}</span>
                  <p>Total Tasks</p>
                </div>
                <div>
                  <span>{tasks.filter((task) => task.status === "todo").length}</span>
                  <p>Todo</p>
                </div>
                <div>
                  <span>{tasks.filter((task) => task.status === "in progress").length}</span>
                  <p>In Progress</p>
                </div>
                <div>
                  <span>{tasks.filter((task) => task.status === "done").length}</span>
                  <p>Done</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="dashboard">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="search-section">
              <SearchBar searchText={searchText} onSearchChange={setSearchText} />
            </div>

            <TaskForm
              editingTask={editingTask}
              onAddTask={addTask}
              onSaveTask={saveTask}
              selectedTask={selectedTask}
              statusOptions={statusOptions}
              validationMessage={formMessage}
            />

            <TaskTable
              onDeleteTask={requestDelete}
              onEditTask={requestEdit}
              onClearSelection={clearSelectedTasks}
              onSelectTask={selectTask}
              onSelectAllTasks={selectAllVisibleTasks}
              selectedTaskIds={selectedTaskIds}
              tasks={filteredTasks}
            />
          </section>
        )}
      </div>

      <ZoomControls zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} />
    </main>
  );
}

export default App;
