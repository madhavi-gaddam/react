import React from "react";
import { Header } from "./components/Header.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskTable } from "./components/TaskTable.jsx";
import { ProfileModal } from "./components/ProfileModal.jsx";
import { makeInitialTasks, statusOptions } from "./data/tasks.js";

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
    const savedTheme = window.localStorage.getItem("task-board-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [profile, setProfile] = React.useState(() => {
    const savedProfile = window.localStorage.getItem("task-board-profile");
    return savedProfile ? JSON.parse(savedProfile) : {};
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState(makeInitialTasks);
  const [searchText, setSearchText] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedTaskIds, setSelectedTaskIds] = React.useState([]);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [formMessage, setFormMessage] = React.useState("");

  const selectedTaskId = selectedTaskIds.length === 1 ? selectedTaskIds[0] : null;
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const editingTask = tasks.find((task) => task.id === editingTaskId);
  const taskCounts = React.useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      "in progress": tasks.filter((task) => task.status === "in progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  React.useEffect(() => {
    window.localStorage.setItem("task-board-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

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
    setActiveTab("all");
    setSearchText("");
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

  function saveProfile(profileData) {
    setProfile(profileData);
    window.localStorage.setItem("task-board-profile", JSON.stringify(profileData));
  }

  return (
    <main className={`page${isDarkTheme ? " theme-dark" : ""}`}>
      <div className="app-scale">
        <Sidebar
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
          profile={profile}
          onProfileClick={() => setIsProfileModalOpen(true)}
        />

        <div className={`workspace${isProfileModalOpen ? " profile-open" : ""}`}>
          <div className="dashboard-scale">
            <section className="dashboard">
              <Header activeTab={activeTab} onTabChange={setActiveTab} taskCounts={taskCounts} />

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
          </div>

          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={saveProfile}
            profile={profile}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
