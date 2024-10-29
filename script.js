const observer = new IntersectionObserver((entries, observer) =>
{
  entries.forEach(entry =>
  {
    if (entry.isIntersecting)
    {
      entry.target.classList.add('show');
    }
    else
    {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.1
});

const targetElements = document.querySelectorAll('.container');

targetElements.forEach(target =>
{
  observer.observe(target);
});
