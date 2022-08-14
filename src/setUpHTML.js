const grids = document.querySelectorAll('.grid');

grids.forEach((grid) => {
  for (let i = 0; i < 100; i++) {
    const newGridItem = document.createElement('div');
    newGridItem.classList.add('gridItem');
    grid.appendChild(newGridItem);
  }
});
