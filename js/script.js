document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const formMessage = document.getElementById("formMessage");
    const submitBtn = contactForm.querySelector("button[type='submit']");

    const invalidNameChars = /[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g;
    const validNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ---------- Helpers ----------

    function createError(input) {
        const el = document.createElement("small");
        el.className = "field-error";
        input.insertAdjacentElement("afterend", el);
        return el;
    }

    function showError(message) {
        formMessage.textContent = message;
        formMessage.style.color = "#B00020";
        contactForm.classList.remove("shake");
        void contactForm.offsetWidth; // restart the animation
        contactForm.classList.add("shake");
    }

    contactForm.addEventListener("animationend", function (e) {
        if (e.animationName === "shake") contactForm.classList.remove("shake");
    });

    // ---------- Live name validation ----------
    const nameError = createError(nameInput);
    let nameTimer;

    nameInput.addEventListener("input", function () {
        const cleaned = this.value.replace(invalidNameChars, "");
        if (cleaned !== this.value) {
            this.value = cleaned;
            nameError.textContent = "Numbers and symbols aren't allowed. Please use letters only.";
            clearTimeout(nameTimer);
            nameTimer = setTimeout(() => (nameError.textContent = ""), 3000);
        } else {
            clearTimeout(nameTimer);
            nameError.textContent = "";
        }
    });

    // ---------- Live email validation ----------
    const emailError = createError(emailInput);

    function checkEmail() {
        const value = emailInput.value.trim();
        if (value === "") {
            emailError.textContent = "";
        } else if (!value.includes("@")) {
            emailError.textContent = "Email must include an @ symbol.";
        } else if (!emailPattern.test(value)) {
            emailError.textContent = "Please enter a full email address, e.g. name@example.com.";
        } else {
            emailError.textContent = "";
        }
    }

    emailInput.addEventListener("input", checkEmail);
    emailInput.addEventListener("blur", checkEmail);

    // ---------- Success effects ----------
    function showSuccess(name) {
        formMessage.style.color = "";
        formMessage.innerHTML =
            '<div class="success-box">' +
            '<svg class="checkmark" viewBox="0 0 36 36">' +
            '<circle cx="18" cy="18" r="15"/>' +
            '<path d="M10 19 L16 25 L26 12"/>' +
            "</svg><span></span></div>";
        // textContent keeps the name safe
        formMessage.querySelector("span").textContent =
            "Thank you, " + name + "! Your enquiry has been sent.";
    }

    function morphButton() {
        if (!submitBtn) return;
        const originalHTML = submitBtn.innerHTML;
        submitBtn.classList.add("sent");
        submitBtn.innerHTML = "Sent ✓";
        submitBtn.disabled = true;

        setTimeout(function () {
            submitBtn.classList.remove("sent");
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 3000);
    }

    function launchLeaves() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        for (let i = 0; i < 20; i++) {
            const leaf = document.createElement("span");
            leaf.className = "leaf";
            leaf.textContent = "🍃";
            leaf.style.left = Math.random() * 100 + "vw";
            leaf.style.fontSize = 16 + Math.random() * 16 + "px";
            leaf.style.animationDuration = 2 + Math.random() * 2 + "s";
            document.body.appendChild(leaf);
            setTimeout(() => leaf.remove(), 4500);
        }
    }

    // ---------- Submit validation ----------
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value;
        const message = messageInput.value.trim();

        if (!name || !email || !subject || !message) {
            showError("Please complete all fields.");
            return;
        }

        if (!validNamePattern.test(name)) {
            showError("Name can only contain letters.");
            return;
        }

        if (!email.includes("@")) {
            showError("Email must include an @ symbol.");
            return;
        }

        if (!emailPattern.test(email)) {
            showError("Please enter a full email address, e.g. name@example.com.");
            return;
        }

        // Success: values are already read, so reset first. The reset handler
        // clears formMessage, so the success message must be shown AFTER it.
        contactForm.reset();
        nameError.textContent = "";
        emailError.textContent = "";

        showSuccess(name);
        morphButton();
        launchLeaves();
    });

    // ---------- Clear button ----------
    contactForm.addEventListener("reset", function () {
        nameError.textContent = "";
        emailError.textContent = "";
        formMessage.textContent = "";
    });
});

// =====================================
// FAQ ACCORDION
// (kept outside the contact form block so it still runs on pages
// that have no #contactForm)
// =====================================
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const isExpanded = question.getAttribute("aria-expanded") === "true";

            const answerId = question.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);

            // Close all FAQ answers
            faqQuestions.forEach(function (otherQuestion) {
                const otherAnswer = document.getElementById(
                    otherQuestion.getAttribute("aria-controls")
                );

                otherQuestion.setAttribute("aria-expanded", "false");

                if (otherAnswer) {
                    otherAnswer.hidden = true;
                }
            });

            // Open the selected answer if it was previously closed
            if (!isExpanded && answer) {
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        });
    });
});

// JavaScript Logic
// =====================================
// PROFILE FORM
// =====================================

const profileForm = document.getElementById("profileForm");

if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get("username");
        const email = formData.get("email");
        console.log("Username:", username);
        console.log("Email:", email);
        const formPayload = Object.fromEntries(formData.entries());
        console.log(formPayload);
    });
}
  // 1. Prevent the page from refreshing automatically
  event.preventDefault(); 
  // 2. Pass the entire form element into the FormData constructor
  const formData = new FormData(event.target);

  // 3. Extract values using the "name" attribute of the inputs
  const username = formData.get('username');
  const email = formData.get('email');

  console.log('Username:', username);
  console.log('Email:', email);
  
  // Quick trick to convert the whole form into a plain object:
  const formPayload = Object.fromEntries(formData.entries());
  console.log(formPayload); 

/* =====================================
   ORDER FORM
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");

    if (!orderForm) return;

    const productSelect = document.getElementById("orderProduct");
    const quantityInput = document.getElementById("orderQuantity");
    const orderTotal = document.getElementById("orderTotal");
    const fulfilment = document.getElementById("fulfilment");
    const addressGroup = document.getElementById("deliveryAddressGroup");
    const addressInput = document.getElementById("deliveryAddress");
    const orderMessage = document.getElementById("orderMessage");
    const successMessage = document.getElementById("orderSuccess");

    const prices = {
        tea: 80,
        gummies: 120,
        collagen: 150
    };

    function updateTotal() {
        const price = prices[productSelect.value] || 0;
        const quantity = Number(quantityInput.value) || 0;

        orderTotal.textContent =
            "R" + (price * quantity).toFixed(2);
    }

    function updateDeliveryFields() {
        const needsDelivery = fulfilment.value === "delivery";

        addressGroup.hidden = !needsDelivery;
        addressInput.required = needsDelivery;

        if (!needsDelivery) {
            addressInput.value = "";
        }
    }

    productSelect.addEventListener("change", updateTotal);
    quantityInput.addEventListener("input", updateTotal);
    fulfilment.addEventListener("change", updateDeliveryFields);

    orderForm.addEventListener("reset", function () {
        setTimeout(function () {
            updateTotal();
            updateDeliveryFields();
            orderMessage.textContent = "";
            successMessage.hidden = true;
        }, 0);
    });

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        orderMessage.textContent = "";

        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        const quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            orderMessage.textContent =
                "Please enter a quantity between 1 and 99.";
            quantityInput.focus();
            return;
        }

        if (!prices[productSelect.value]) {
            orderMessage.textContent =
                "Please select a valid product.";
            productSelect.focus();
            return;
        }

        if (
            fulfilment.value === "delivery" &&
            !addressInput.value.trim()
        ) {
            orderMessage.textContent =
                "Please enter your delivery address.";
            addressInput.focus();
            return;
        }

        successMessage.hidden = false;
        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        orderForm.reset();
        updateTotal();
        updateDeliveryFields();
    });

    updateTotal();
    updateDeliveryFields();
});

// Natures' Garden - Order form logic
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("orderForm");
    if (!form) return; // Other pages don't have the order form

    const productSelect = document.getElementById("orderProduct");
    const quantityInput = document.getElementById("orderQuantity");
    const totalDisplay = document.getElementById("orderTotal");
    const fulfilmentSelect = document.getElementById("fulfilment");
    const addressGroup = document.getElementById("deliveryAddressGroup");
    const addressInput = document.getElementById("deliveryAddress");
    const messageBox = document.getElementById("orderMessage");
    const successBox = document.getElementById("orderSuccess");

    // Product catalogue (prices in Rand)
    const PRODUCTS = {
        tea: { name: "Herbal Tea", price: 80 },
        gummies: { name: "Herbal Gummies", price: 120 },
        collagen: { name: "Collagen Powder", price: 150 }
    };

    const formatRand = (amount) =>
        "R" + amount.toLocaleString("en-ZA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).replace(/\u00a0/g, " ");

    const getQuantity = () => {
        const qty = parseInt(quantityInput.value, 10);
        return Number.isNaN(qty) ? 0 : qty;
    };

    // ---------- Total ----------
    function updateTotal() {
        const product = PRODUCTS[productSelect.value];
        const qty = getQuantity();
        const total = product && qty > 0 ? product.price * qty : 0;
        totalDisplay.textContent = formatRand(total);
        return total;
    }

    // ---------- Delivery / Collection ----------
    function updateFulfilment() {
        const isDelivery = fulfilmentSelect.value === "delivery";
        addressGroup.hidden = !isDelivery;
        addressInput.required = isDelivery;
        if (!isDelivery) addressInput.value = "";
    }

    // ---------- Messages ----------
    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = type || "";
        messageBox.style.color = type === "error" ? "#b3261e" : "#2e7d32";
    }

    function clearMessage() {
        messageBox.textContent = "";
        messageBox.className = "";
    }

    // ---------- Validation ----------
    function validate() {
        const errors = [];
        const name = form.customerName.value.trim();
        const email = form.customerEmail.value.trim();
        const phone = form.customerPhone.value.trim();
        const qty = getQuantity();

        if (name.length < 2) {
            errors.push("Please enter your full name.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        // South African numbers: 0821234567, 082 123 4567, +27 82 123 4567
        const digits = phone.replace(/[\s\-()]/g, "");
        if (!/^(\+27|0)\d{9}$/.test(digits)) {
            errors.push("Please enter a valid contact number (e.g. 082 123 4567).");
        }

        if (!PRODUCTS[productSelect.value]) {
            errors.push("Please select a product.");
        }

        if (qty < 1 || qty > 99) {
            errors.push("Quantity must be between 1 and 99.");
        }

        if (!fulfilmentSelect.value) {
            errors.push("Please choose delivery or collection.");
        } else if (
            fulfilmentSelect.value === "delivery" &&
            addressInput.value.trim().length < 10
        ) {
            errors.push("Please enter a full delivery address.");
        }

        return errors;
    }

    // ---------- Confirmation summary ----------
    function buildSummary() {
        const product = PRODUCTS[productSelect.value];
        const qty = getQuantity();

        const lines = [
            ["Name", form.customerName.value.trim()],
            ["Email", form.customerEmail.value.trim()],
            ["Phone", form.customerPhone.value.trim()],
            ["Product", `${product.name} x ${qty}`],
            ["Product total", formatRand(product.price * qty)],
            ["Method", fulfilmentSelect.value === "delivery" ? "Delivery" : "Collection"]
        ];

        if (fulfilmentSelect.value === "delivery") {
            lines.push(["Address", addressInput.value.trim()]);
        }

        const notes = form.orderNotes.value.trim();
        if (notes) lines.push(["Notes", notes]);

        // Built with textContent so user input is never treated as HTML
        const list = document.createElement("ul");
        list.id = "orderSummary";
        lines.forEach(([label, value]) => {
            const li = document.createElement("li");
            const strong = document.createElement("strong");
            strong.textContent = label + ": ";
            li.appendChild(strong);
            li.appendChild(document.createTextNode(value));
            list.appendChild(li);
        });
        return list;
    }

    // ---------- Events ----------
    productSelect.addEventListener("change", updateTotal);
    quantityInput.addEventListener("input", updateTotal);
    quantityInput.addEventListener("blur", () => {
        // Keep quantity within allowed range
        let qty = getQuantity();
        if (qty < 1) qty = 1;
        if (qty > 99) qty = 99;
        quantityInput.value = qty;
        updateTotal();
    });
    fulfilmentSelect.addEventListener("change", updateFulfilment);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        successBox.hidden = true;

        const errors = validate();
        if (errors.length > 0) {
            showMessage(errors.join(" "), "error");
            return;
        }

        // Build the summary before the form is cleared
        const summary = buildSummary();
        form.reset(); // the reset listener below tidies up the total and address box

        // Replace any previous summary, then show the new one
        const oldSummary = document.getElementById("orderSummary");
        if (oldSummary) oldSummary.remove();
        successBox.querySelector("h2").insertAdjacentElement("afterend", summary);

        clearMessage();
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    form.addEventListener("reset", () => {
        // Wait for the browser to restore default values first
        setTimeout(() => {
            updateTotal();
            updateFulfilment();
        }, 0);
        clearMessage();
        successBox.hidden = true;
    });

    // Initial state
    updateTotal();
    updateFulfilment();
});
$(document).ready(function() {
  let currentIndex = 0;
  const items = $('.gallery-item');
  
  // Update Lightbox Content
  function showImage(index) {
    const targetItem = items.eq(index);
    const fullImgUrl = targetItem.find('img').attr('data-full');
    $('#lightbox-img').attr('src', fullImgUrl);
    currentIndex = index;
  }

  // Open Lightbox
  items.on('click', function() {
    const index = items.index(this);
    showImage(index);
    $('#lightbox').css('display', 'flex');
  });

  // Close Lightbox
  $('.close-btn, #lightbox').on('click', function(e) {
    if ($(e.target).is('#lightbox') || $(e.target).is('.close-btn')) {
      $('#lightbox').css('display', 'none');
    }
  });

  // Next Button Logic
  $('.next-btn').on('click', function(e) {
    e.stopPropagation();
    let nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) nextIndex = 0; // Loop back to start
    showImage(nextIndex);
  });

  // Previous Button Logic
  $('.prev-btn').on('click', function(e) {
    e.stopPropagation();
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = items.length - 1; // Loop to end
    showImage(prevIndex);
  });

  // Keyboard navigation support
  $(document).on('keydown', function(e) {
    if ($('#lightbox').is(':visible')) {
      if (e.key === 'ArrowRight') $('.next-btn').click();
      if (e.key === 'ArrowLeft') $('.prev-btn').click();
      if (e.key === 'Escape') $('#lightbox').css('display', 'none');
    }
  });
});
$(document).ready(function () {
  const $lightbox = $('#lightbox');
  const $img = $('#lightbox-img');
  const $caption = $('#lightbox-caption');
  let currentIndex = 0;

  function items() { return $('.product-card img'); }

  function showImage(index) {
    const $item = items().eq(index);
    const title = $item.closest('.product-card').find('h2').first().text().trim();
    $img.attr('src', $item.attr('data-full') || $item.attr('src'));
    $caption.text(title || $item.attr('alt') || '');
    currentIndex = index;
  }

  function openLightbox(index) {
    showImage(index);
    $lightbox.css('display', 'flex');
  }

  function closeLightbox() {
    $lightbox.css('display', 'none');
  }

  // Works even if the cards are added after page load
  $(document).on('click', '.product-card img', function (e) {
    e.preventDefault();
    openLightbox(items().index(this));
  });
  $('.product-card img').css('cursor', 'zoom-in');

  $lightbox.on('click', function (e) {
    if ($(e.target).is('#lightbox') || $(e.target).is('.close-btn')) closeLightbox();
  });

  $('.next-btn').on('click', function (e) {
    e.stopPropagation();
    showImage((currentIndex + 1) % items().length);
  });

  $('.prev-btn').on('click', function (e) {
    e.stopPropagation();
    showImage((currentIndex - 1 + items().length) % items().length);
  });

  $(document).on('keydown', function (e) {
    if ($lightbox.css('display') === 'none') return;
    if (e.key === 'ArrowRight') $('.next-btn').click();
    if (e.key === 'ArrowLeft') $('.prev-btn').click();
    if (e.key === 'Escape') closeLightbox();
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("closeLightbox");

    const galleryItems = document.querySelectorAll(".gallery-item");

    // Stop safely if this page has no gallery
    if (!lightbox || !lightboxImage || !lightboxCaption || !closeBtn) {
        return;
    }

    let lastFocused = null;

    // Open the enlarged image
    function openLightbox(item) {
        const thumbnail = item.querySelector("img");
        const caption = item.querySelector("span");

        if (!thumbnail) return;

        lastFocused = item;

        lightboxImage.src = item.dataset.full || thumbnail.src;
        lightboxImage.alt = item.dataset.alt || thumbnail.alt;

        lightboxCaption.textContent = caption
            ? caption.textContent
            : thumbnail.alt;

        lightbox.hidden = false;
        document.body.classList.add("no-scroll");

        closeBtn.focus();
    }

    // Close the lightbox
    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.src = "";

        document.body.classList.remove("no-scroll");

        if (lastFocused) {
            lastFocused.focus();
        }
    }

    // Open when a gallery item is clicked
    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            openLightbox(item);
        });
    });

    // Close button
    closeBtn.addEventListener("click", closeLightbox);

    // Close by clicking the dark background
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close by pressing Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });
});