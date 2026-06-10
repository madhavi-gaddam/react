import React from "react";
import { Header } from "./components/Header.jsx";
import { ProductsPage } from "./components/ProductsPage.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskTable } from "./components/TaskTable.jsx";
import { makeInitialTasks, statusOptions } from "./data/tasks.js";

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
    const savedTheme = window.localStorage.getItem("task-board-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return false;
  });
  const [tasks, setTasks] = React.useState(makeInitialTasks);
  const [searchText, setSearchText] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedTaskIds, setSelectedTaskIds] = React.useState([]);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [formMessage, setFormMessage] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("tasks");
  const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({
    firstName: "Madhavi",
    lastName: "Gaddam",
    gmail: "",
  });
  const [registration, setRegistration] = React.useState({
    firstName: "Madhavi",
    lastName: "Gaddam",
    gmail: "",
  });
  const [registrationMessage, setRegistrationMessage] = React.useState("");

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

  function updateRegistrationField(event) {
    const { name, value } = event.target;

    setRegistration((currentRegistration) => ({
      ...currentRegistration,
      [name]: value,
    }));
    setRegistrationMessage("");
  }

  function saveRegistration(event) {
    event.preventDefault();

    const nextProfile = {
      firstName: registration.firstName.trim(),
      lastName: registration.lastName.trim(),
      gmail: registration.gmail.trim(),
    };

    if (!nextProfile.firstName || !nextProfile.lastName) {
      setRegistrationMessage("First name and last name are required.");
      return;
    }

    setProfile(nextProfile);
    setRegistration(nextProfile);
    setRegistrationMessage("Profile saved.");
    setIsRegistrationOpen(false);
  }

  return (
    <main className={`page${isDarkTheme ? " theme-dark" : ""}${currentPage === "products" ? " products-mode" : ""}`}>
      <div className="app-scale">
        <Sidebar
          currentPage={currentPage}
          isDarkTheme={isDarkTheme}
          onNavigate={(nextPage) => {
            setCurrentPage(nextPage);
            setIsRegistrationOpen(false);
          }}
          onProfileClick={() => setIsRegistrationOpen(true)}
          onToggleTheme={() => setIsDarkTheme((currentTheme) => !currentTheme)}
          profile={profile}
        />

        <div className={`workspace${isRegistrationOpen ? " registration-open" : ""}`}>
          {currentPage === "products" ? (
            <ProductsPage />
          ) : (
            <div className="dashboard-scale">
              <section className="dashboard">
                <Header
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  taskCounts={taskCounts}
                />

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
          )}

          {currentPage === "tasks" && isRegistrationOpen && (
            <aside className="registration-panel" aria-label="Profile registration form">
              <div className="registration-header">
                <h2>Registration</h2>
              </div>

              <form className="registration-form" onSubmit={saveRegistration}>
                <label>
                  <span>First name</span>
                  <input
                    name="firstName"
                    onChange={updateRegistrationField}
                    required
                    type="text"
                    value={registration.firstName}
                  />
                </label>

                <label>
                  <span>Last name</span>
                  <input
                    name="lastName"
                    onChange={updateRegistrationField}
                    required
                    type="text"
                    value={registration.lastName}
                  />
                </label>

                <label>
                  <span>Gmail</span>
                  <input
                    name="gmail"
                    onChange={updateRegistrationField}
                    placeholder="Optional"
                    type="email"
                    value={registration.gmail}
                  />
                </label>

                <button type="submit">Save</button>

                {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
              </form>
            </aside>
          )}
        </div>
      </div>

    </main>
  );
}

export default App;
