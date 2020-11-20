<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VirtualRealityController extends AbstractController
{
    /**
     * @Route("/virtual-reality", name="virtual_reality")
     */
    public function virtualReality(): Response
    {
        return $this->render('virtual_reality/index.html.twig');
    }

    /**
     * @Route("/avatar", name="avatar")
     */
    public function avatar(): Response
    {
        return $this->render('virtual_reality/avatar.html.twig');
    }

    /**
     * @Route("/chatvr", name="chatvr")
     */
    public function chatVr(): Response
    {
        return $this->render('virtual_reality/chat-vr.html.twig');
    }

    /**
     * @Route("/spacevr", name="spacevr")
     */
    public function spaceVr(): Response
    {
        return $this->render('virtual_reality/space-vr.html.twig');
    }

    /**
     * @Route("/environmentvr", name="environmentvr")
     */
    public function environmentVr(): Response
    {
        return $this->render('virtual_reality/environment-vr.html.twig');
    }

    /**
     * @Route("/sendmssg", name="send_message", methods={"POST"})
     */
    public function sendMessage(): Response
    {
        $message = $_POST["message"];
        return $this->render('virtual_reality/prueba.html.twig', [
            'message' => $message,
        ]);
    }

    /**
     * @Route("/xx", name="xx")
     */
    public function xx(): Response
    {
        return $this->render('virtual_reality/xx.html.twig');
    }
}
