<?php

header("Access-Control-Allow-Origin: *"); 
$u = isset($_POST["u"]) ? $_POST["u"] : '';
$c = isset($_POST["c"]) ? $_POST["c"]: '';
$a = isset($_POST["a"]) ? $_POST["a"] : '';
$n = isset($_POST["n"]) ? $_POST["n"]: '';
$i = isset($_POST["i"]) ? $_POST["i"]: '';
$i2 = isset($_POST["i2"]) ? $_POST["i2"]: '';
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}
// 连主库
//$conn = mysqli_connect('路径'.':'.'端口','账号','密码','库名');
include 'conn_sql.php';

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql="UPDATE  `2code_code` SET  `content` =  '".$c."',
`address` =  '".$a."',
`name` =  '".$n."',
`info` =  '".$i2."'  WHERE  `2code_code`.`id` ='".$i."' AND `2code_code`.`user` ='".$u."'";



$result = $conn->query($sql);

class Verify {
    public $code  = '00';
}
$verify = new Verify();

// var_dump($result);
if ($result){
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);
?>
