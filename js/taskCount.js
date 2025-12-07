function countTasks(tasks) {
  let completed = 0;

  for (let t of tasks) {
    if (t.completed) completed++;
  }

  return {
    all: tasks.length,
    completed,
    pending: tasks.length - completed,
  };
}

export function updateTaskCounters(tasks) {
  const counts = countTasks(tasks);

  document.querySelector(".all").textContent = counts.all;
  document.querySelector(".completed").textContent = counts.completed;
  document.querySelector(".pending").textContent = counts.pending;
}
