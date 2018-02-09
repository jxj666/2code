<?php

header("Access-Control-Allow-Origin: *"); 
$u = isset($_GET["u"]) ? $_GET["u"] : '';
$p = isset($_GET["p"]) ? $_GET["p"]: '';
session_start();

 
// 连主库
$conn = mysqli_connect('w.rdc.sae.sina.com.cn'.':'.'3306','kzl3w535lm','1313mzj34mi1x05z5k3imj1k2j13m2w2hykl1ziz','app_jxjweb');

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql="SELECT * FROM 2code_user WHERE user = '".$u."' AND password='".$p."'";
 $result = $conn->query($sql);
class Verify {
    public $code  = '00';
    public $user = '00';
}
$verify = new Verify();
$verify->user = $u;

if ($result->num_rows > 0){
	$_SESSION['code'] = $u;
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);
$conn->close();
?>