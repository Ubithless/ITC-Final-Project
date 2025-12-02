// data for demo. replace/extend with real cafe info & images (images/ folder)
const cafeData = {
  mandurriao: [
    { name: "Cafe Aroma", price: "₱120" },
    { name: "Lazy Brew", price: "₱95" },
    { name: "Beanery Spot", price: "₱140" }
  ],
  jaro: [
    { name: "Cafe 86", price: "₱110" },
    { name: "Warm Mug", price: "₱130" }
  ],
  lapaz: [
    { name: "Cafe Pison", price: "₱150" },
    { name: "Steep Street Cafe", price: "₱125" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const hotspots = document.querySelectorAll(".hotspot");
  const mapCard = document.getElementById("mapCard");
  const popup = document.getElementById("areaPopup");
  const popupList = document.getElementById("popupList");
  const popupTitle = document.getElementById("popupTitle");
  const popupClose = document.getElementById("popupClose");

  hotspots.forEach(btn => {
    // floating subtle animation on hover start
    btn.addEventListener("mouseenter", () => btn.classList.add("float"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("float"));

    btn.addEventListener("click", (e) => {
      const area = btn.dataset.area;
      openArea(area, btn);
    });
  });

  function openArea(area, btn) {
    // populate popup with cafes
    popupTitle.textContent = area.charAt(0).toUpperCase() + area.slice(1);
    popupList.innerHTML = "";
    const list = cafeData[area] || [];
    if (!list.length) popupList.innerHTML = "<p>No cafés listed yet.</p>";
    list.forEach(cafe => {
      const item = document.createElement("div");
      item.className = "cafe-card";
      item.innerHTML = `<div class="cafe-thumb" aria-hidden="true"></div>
         <div class="cafe-info"><strong>${cafe.name}</strong><div class="cafe-meta">${cafe.price}</div></div>`;
      item.addEventListener("click", () => {
        // navigate to cafes.html with query params
        window.location.href = `cafes.html?name=${encodeURIComponent(cafe.name)}&area=${encodeURIComponent(area)}`;
      });
      popupList.appendChild(item);
    });

    // compute transform origin for map-card zoom
    const rect = mapCard.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const cx = ((btnRect.left + btnRect.width / 2) - rect.left) / rect.width * 100;
    const cy = ((btnRect.top + btnRect.height / 2) - rect.top) / rect.height * 100;
    mapCard.style.setProperty('--origin-x', cx + '%');
    mapCard.style.setProperty('--origin-y', cy + '%');

    // add zoom class
    mapCard.classList.add("zoom");

    // show popup
    popup.classList.add("visible");
    popup.setAttribute("aria-hidden", "false");
  }

  function closePopup() {
    popup.classList.remove("visible");
    popup.setAttribute("aria-hidden", "true");
    mapCard.classList.remove("zoom");
  }

  popupClose.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => { if (e.target === popup) closePopup(); });
});
