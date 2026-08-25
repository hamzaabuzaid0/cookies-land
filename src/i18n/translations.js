// Every UI string lives here, keyed once for Arabic and once for English —
// see src/i18n/LanguageContext.jsx for how a key resolves to the current
// language. Add a key to BOTH languages at once; a missing key just falls
// back to rendering its own key name (easy to spot while editing).
export const translations = {
  ar: {
    // Brand / header
    brandName: 'كوكيز لاند',
    tagline: 'أكل جاهز ومجمد وحلويات — من بيتنا لبيتك',
    cart: 'السلة',

    // Nav
    navHome: 'الرئيسية',
    navShop: 'المنتجات',
    navCustomOrder: 'طلب خاص',
    navAbout: 'تواصل معنا',

    // Hero
    heroTitle: 'كوكيز لاند',
    heroSubtitle:
      'أكل جاهز ومجمد، بروتينات، حلويات وآيس كريم — اطلب أونلاين واستلم من المحل أو خليها توصلك لحد البيت.',
    heroCtaShop: 'تصفح المنتجات',
    heroCtaCustom: 'اطلب طلب خاص',
    heroBadgePickup: 'استلام من المحل',
    heroBadgeDelivery: 'توصيل للبيت',
    heroBadgeWhatsapp: 'الطلب عبر واتساب',

    shopByCategory: 'تسوق حسب القسم',

    // Product card
    add: 'أضف للسلة',
    priceApprox: 'سعر مبدئي',
    priceNote: 'السعر النهائي يتأكد على واتساب',
    photoPending: 'الصورة هتتضاف قريبًا',
    prelim: 'قائمة أولية',

    // Cart
    yourCart: 'سلتك',
    cartEmpty: 'السلة فاضية لسه',
    subtotal: 'الإجمالي الفرعي',
    deliveryFeeLabel: 'رسوم التوصيل',
    total: 'الإجمالي',
    orderViaWhatsapp: 'إتمام الطلب عبر واتساب',
    egp: 'جنيه',
    remove: 'حذف',

    // Fulfillment (shared between cart checkout and custom order)
    fulfillmentTitle: 'طريقة الاستلام',
    pickup: 'استلام من المحل',
    delivery: 'توصيل للبيت',
    nameLabel: 'الاسم',
    phoneLabel: 'رقم الموبايل',
    addressLabel: 'العنوان بالتفصيل',
    notesLabel: 'ملاحظات (اختياري)',
    fillRequiredFields: 'من فضلك املأ الاسم والموبايل، والعنوان لو هيكون توصيل',
    continueToWhatsapp: 'تأكيد وإرسال عبر واتساب',

    // Custom order
    customOrderTitle: 'طلب خاص / مناسبات',
    customOrderIntro:
      'عايز طلبية بكمية كبيرة، أو صنف مش موجود في القائمة، أو تجهيز لمناسبة؟ املأ البيانات وهنتواصل معاك على واتساب.',
    itemWantedLabel: 'الصنف المطلوب',
    itemWantedPlaceholder: 'مثال: ٥ كيلو كفتة مشوية لعزومة',
    quantityLabel: 'الكمية',
    dateNeededLabel: 'التاريخ المطلوب فيه الطلب',
    sendCustomOrder: 'إرسال الطلب عبر واتساب',
    customOrderFillRequired: 'من فضلك اكتب الصنف المطلوب والاسم والموبايل',

    // WhatsApp message building
    waMsgIntro: 'طلب جديد من موقع كوكيز لاند',
    waMsgFulfillment: 'طريقة الاستلام',
    waMsgPickup: 'استلام من المحل',
    waMsgDelivery: 'توصيل للبيت',
    waMsgName: 'الاسم',
    waMsgPhone: 'الموبايل',
    waMsgAddress: 'العنوان',
    waMsgNotes: 'ملاحظات',
    waMsgSubtotal: 'الإجمالي الفرعي',
    waMsgDeliveryFee: 'رسوم التوصيل',
    waMsgFinalTotal: 'الإجمالي النهائي',
    waMsgConfirm: 'من فضلكم أكدوا الطلب والسعر النهائي 🙏',
    waMsgCustomIntro: 'طلب خاص جديد من موقع كوكيز لاند',
    waMsgCustomItem: 'الصنف المطلوب',
    waMsgCustomQty: 'الكمية',
    waMsgCustomDate: 'التاريخ المطلوب',
    waMsgCustomNotes: 'ملاحظات',
    waMsgCustomConfirm: 'من فضلكم كلموني لتأكيد التفاصيل والسعر 🙏',

    // About / footer
    aboutTitle: 'عن كوكيز لاند',
    aboutText:
      'كوكيز لاند في مدينة السادس من أكتوبر — أكل جاهز ومجمد، بروتينات، صوصات مستوردة، وحلويات وآيس كريم. تقدروا تطلبوا أونلاين وتستلموا من المحل أو نوصلكم لحد البيت.',
    followUs: 'تابعونا',
    locationLabel: 'العنوان',
    locationValue: 'مدينة السادس من أكتوبر، الجيزة',
    whatsappLabel: 'واتساب',
    footerNote: 'موقع تجريبي (ديمو) — الأسعار مبدئية لحد ما تتأكد.',
  },
  en: {
    // Brand / header
    brandName: 'Cookies Land',
    tagline: 'Ready-to-cook, frozen & desserts — from our kitchen to yours',
    cart: 'Cart',

    // Nav
    navHome: 'Home',
    navShop: 'Shop',
    navCustomOrder: 'Custom Order',
    navAbout: 'Contact',

    // Hero
    heroTitle: 'Cookies Land',
    heroSubtitle:
      'Ready-to-cook & frozen meals, protein, desserts and ice cream — order online and pick up in-store or get it delivered.',
    heroCtaShop: 'Browse Products',
    heroCtaCustom: 'Place a Custom Order',
    heroBadgePickup: 'Store Pickup',
    heroBadgeDelivery: 'Home Delivery',
    heroBadgeWhatsapp: 'Order via WhatsApp',

    shopByCategory: 'Shop by Category',

    // Product card
    add: 'Add to Cart',
    priceApprox: 'Estimated price',
    priceNote: 'Final price confirmed on WhatsApp',
    photoPending: 'Photo coming soon',
    prelim: 'Preliminary list',

    // Cart
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    subtotal: 'Subtotal',
    deliveryFeeLabel: 'Delivery Fee',
    total: 'Total',
    orderViaWhatsapp: 'Checkout via WhatsApp',
    egp: 'EGP',
    remove: 'Remove',

    // Fulfillment
    fulfillmentTitle: 'How would you like to get your order?',
    pickup: 'Store Pickup',
    delivery: 'Home Delivery',
    nameLabel: 'Name',
    phoneLabel: 'Phone Number',
    addressLabel: 'Full Address',
    notesLabel: 'Notes (optional)',
    fillRequiredFields: 'Please fill in your name and phone, and address if delivering',
    continueToWhatsapp: 'Confirm & Send via WhatsApp',

    // Custom order
    customOrderTitle: 'Custom Order / Events',
    customOrderIntro:
      "Need a bulk order, something not on the list, or catering for an event? Fill this in and we'll follow up on WhatsApp.",
    itemWantedLabel: 'What do you need?',
    itemWantedPlaceholder: 'e.g. 5kg grilled kofta for a gathering',
    quantityLabel: 'Quantity',
    dateNeededLabel: 'Date needed',
    sendCustomOrder: 'Send Request via WhatsApp',
    customOrderFillRequired: 'Please fill in the item, your name and phone',

    // WhatsApp message building
    waMsgIntro: 'New order from the Cookies Land website',
    waMsgFulfillment: 'Fulfillment',
    waMsgPickup: 'Store pickup',
    waMsgDelivery: 'Home delivery',
    waMsgName: 'Name',
    waMsgPhone: 'Phone',
    waMsgAddress: 'Address',
    waMsgNotes: 'Notes',
    waMsgSubtotal: 'Subtotal',
    waMsgDeliveryFee: 'Delivery fee',
    waMsgFinalTotal: 'Final total',
    waMsgConfirm: 'Please confirm the order and final price 🙏',
    waMsgCustomIntro: 'New custom order request from the Cookies Land website',
    waMsgCustomItem: 'Item requested',
    waMsgCustomQty: 'Quantity',
    waMsgCustomDate: 'Date needed',
    waMsgCustomNotes: 'Notes',
    waMsgCustomConfirm: 'Please call/message to confirm details and price 🙏',

    // About / footer
    aboutTitle: 'About Cookies Land',
    aboutText:
      "Cookies Land is based in 6th of October City — ready-to-cook & frozen meals, protein, imported sauces, desserts and ice cream. Order online and pick up in-store, or we'll deliver to you.",
    followUs: 'Follow Us',
    locationLabel: 'Location',
    locationValue: '6th of October City, Giza',
    whatsappLabel: 'WhatsApp',
    footerNote: 'Demo website — prices are placeholders until confirmed.',
  },
};
