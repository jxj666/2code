<?php

header("Access-Control-Allow-Origin: *"); 
$u = isset($_GET["u"]) ? $_GET["u"] : '';
$p = isset($_GET["p"]) ? $_GET["p"]: '';
session_start();

 
// 连主库
//$conn = mysqli_connect('路径'.':'.'端口','账号','密码','库名');
include 'conn_sql.php';

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

// $sql="SELECT * FROM 2code_user WHERE user = '".$u."' AND password='".$p."'";
$sql = "INSERT INTO `2code_user` (`id`, `user`, `password`, `content`, `time`) VALUES (NULL, '".$u."', '".$p."', '0', '0');";

$result = $conn->query($sql);
class Verify {
    public $code  = '00';
    public $user = '00';
}
$verify = new Verify();
$verify->user = $u;

if ($result){
	$_SESSION['code'] = $u;
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);

?>