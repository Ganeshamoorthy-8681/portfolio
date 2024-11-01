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

const targetElements = document.querySelectorAll('.section');

targetElements.forEach(target =>
{
  observer.observe(target);
});


const navMenuIcon = document.querySelector(".navigation__menu__icon");
const closeIcon = document.querySelector(".navigation__close__icon");
const navLinks = document.querySelector(".navigation__list--mobile");


function handleNavigationMenuClickEvent()
{
  navMenuIcon.classList.toggle("menu-open");
}

navMenuIcon.addEventListener("click", handleNavigationMenuClickEvent);
closeIcon.addEventListener("click", handleNavigationMenuClickEvent);
navLinks.addEventListener("click", handleNavigationMenuClickEvent);
