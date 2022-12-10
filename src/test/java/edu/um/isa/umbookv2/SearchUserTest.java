package edu.um.isa.umbookv2;

// import edu.um.isa.umbookv2.IntegrationTest;
// import edu.um.isa.umbookv2.Umbookv2App;
import edu.um.isa.umbookv2.domain.User;
import edu.um.isa.umbookv2.repository.UserRepository;
import edu.um.isa.umbookv2.service.UserService;
import java.util.List;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.testng.Assert;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

@IntegrationTest
public class SearchUserTest extends AbstractTestNGSpringContextTests {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @BeforeSuite
    public void setUp() {
        System.out.println("Iniciar Test suite de SearchUser");
    }

    @Test
    public void contextLoaded() {
        Assert.assertNotNull(userService);
    }

    @Test(testName = "Buscar por login/username")
    public void searchByLogin() {
        String query = "user";
        List<User> result = userService.searchUser(query);
        Assert.assertTrue(result.size() > 0); // Debe existir al menos un usuario
        for (User user : result) {
            Assert.assertEquals(user.getLogin(), query);
        }
    }
    // @Test(testName="Buscar por nombre")
    // public void searchByFirstName() {}

    // @Test(testName="Buscar por apellido")
    // public void searchByLastName() {}

}
