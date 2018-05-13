<?php
header("Access-Control-Allow-Origin: *");
// 连主库
$conn = mysqli_connect('路径'.':'.'端口','账号','密码','表');

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql = "SELECT * FROM `2code_user` LIMIT 0, 30 ";
$result = $conn->query($sql);
 
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " user: " . $row["user"]. "<br>";
    }
} else {
    echo "0 结果";
}
$conn->close();
?>