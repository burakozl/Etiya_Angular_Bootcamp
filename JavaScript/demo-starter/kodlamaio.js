class HomePage {

    constructor(isLogin){
        this.siteHeader = [];
        this.siteContent = [];
        this.siteContentDetail = [];
        this.isLogin = isLogin;
    }

    headerTitles() {  // header kısmı 
        const siteTitle = "Kodlamaio";
        let navItemWithoutLogin = "Kariyer - Sık Sorulan Sorular - Giriş Yap - Kayıt Ol";
        let navItemWithLogin = "Kurslarım - Tüm Kurslar - Kariyer - Sık Sorulan Sorular";

        if(this.isLogin === false){
            this.siteHeader = [{siteTitle},{navItemWithoutLogin}];
            console.log(`${siteTitle}   ${navItemWithoutLogin}`);
        }else{
            this.siteHeader = [{siteTitle},{navItemWithLogin}];
            console.log(`${siteTitle}   ${navItemWithLogin}`);
        }
        
    }

    addLessons(programingLanguage,title,description,instructor,category){//content kısmı için dersler manuel eklendi
        this.siteContent.push({
            programingLanguage,
            title,
            description,
            instructor,
            category
        });
        console.log("---------------------------------------");
        console.log(`${programingLanguage} 
                     ${title}
                     ${description}
                     ${instructor}`);    
    }

    filterByCategory(filterCb){//kategori filtreleme
        console.log("-------------------Result of category filter--------------------");
        console.log(filterCb !== undefined ? this.siteContent.filter(filterCb) : this.houses);
        console.log("---------------------------------------");
    }
    filterByInstructor(filterCb){//Eğitmen filtreleme
        console.log("-------------------Result of Instructor filter--------------------");
        console.log(filterCb !== undefined ? this.siteContent.filter(filterCb) : this.houses);
        console.log("---------------------------------------");
    }
    filterBySearch(filterCb){//Search bar filtreleme
        console.log("-----------------Result of Instructor filter----------------------");
        console.log(filterCb !== undefined ? this.siteContent.filter(filterCb) : this.houses);
        console.log("---------------------------------------");
    }

    getDetailPage(pageTitle){//title'a göre detay sayfası getir
        let title,
        description,
        joinTheCourseButton = "Programa Dahil Ol";

        const detail = this.siteContent.filter(title => title.title.includes(pageTitle));

        detail.map(item => {
            title = item.title;
            description = item.description;
        });
        
        this.siteContentDetail.push({
            title,
            description,
            joinTheCourseButton
          });
          
          console.log("----------------------------");
          console.log(`${title}
                        ${description}
                        ${joinTheCourseButton}`);
    }

    joinTheCourse(){//ilgili kursa katıl    
        this.isLogin ? console.log(`Tebrikler! Kampa katılımınız sağlandı...`) : console.log("Kursa katılmak için lütfen giriş yapın...");
    }

    isLogin(isLogin){//login işlemi
        isLogin ? console.log("Başarılı bir şekilde Giriş Yaptınız") : console.log("Lütfen Derslere kayıt olmak için giriş yapınız");
    }

}

let kodlamaio = new HomePage(true);

kodlamaio.headerTitles();

//--Content kısmı
kodlamaio.addLessons("C#-Angular", "Yazılım Geliştirici Yetiştirme Kampı (C# + ANGULAR)", "2 ay sürecek Yazılım Geliştirici Yetiştirme Kampımızın takip, döküman ve duyurularını buradan yapacağız.", "Engin Demirog","Programlama");

kodlamaio.addLessons(".Net", "Senior Yazılım Geliştirici Yetiştirme Kampı (.NET)", "Senior Yazılım Geliştirici Yetiştirme Kampımızın takip, döküman ve duyurularını buradan yapacağız.", "Engin Demirog","Programlama");

kodlamaio.addLessons("Java", "(2022) Yazılım Geliştirici Yetiştirme Kampı - JAVA", "Java Yazılım Geliştirici Yetiştirme Kampımızın takip, döküman ve duyurularını buradan yapacağız.", "Engin Demirog","Programlama");

kodlamaio.addLessons("JavaScript", "Yazılım Geliştirici Yetiştirme Kampı (JavaScript)", "1,5 ay sürecek Yazılım Geliştirici Yetiştirme Kampımızın takip, döküman ve duyurularını buradan yapacağız.", "Engin Demirog","Programlama");

kodlamaio.addLessons("Programlamaya Giriş", "Programlamaya Giriş için Temel Kurs", "PYTHON, JAVA, C# gibi tüm programlama dilleri için temel programlama mantığını anlaşılır örneklerle öğrenin.", "Engin Demirog","Programlama");

kodlamaio.addLessons("JAVA + REACT", "Yazılım Geliştirici Yetiştirme Kampı (JAVA + REACT)", "2 ay sürecek Yazılım Geliştirici Yetiştirme Kampımızın takip, döküman ve duyurularını buradan yapacağız.", "Engin Demirog","Programlama");


//----Filtreme Kısımları---

kodlamaio.filterByCategory(item => item.category === "Programlama");
kodlamaio.filterByInstructor(item => item.instructor === "Engin Demirog");
kodlamaio.filterBySearch(item => item.title.toLowerCase().includes('av'));

//---Detay Sayfası---

kodlamaio.getDetailPage("JavaScript");

//--Programa Dahil ol işlemi--

kodlamaio.joinTheCourse();